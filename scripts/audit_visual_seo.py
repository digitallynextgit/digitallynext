"""
Visual & Mobile SEO Audit Script
Captures screenshots and extracts SEO signals from digitallynext.com
"""

from playwright.sync_api import sync_playwright
import json
import os

SCREENSHOTS_DIR = r"C:\Users\Karan\Desktop\Projects\Digitally next_projects\digitallynext\screenshots"
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

PAGES = [
    {"name": "homepage", "url": "https://www.digitallynext.com/"},
    {"name": "seo-service", "url": "https://www.digitallynext.com/services/seo-optimization"},
    {"name": "blog", "url": "https://www.digitallynext.com/blog"},
]

VIEWPORTS = [
    {"name": "desktop", "width": 1920, "height": 1080},
    {"name": "mobile",  "width": 375,  "height": 812},
    {"name": "tablet",  "width": 768,  "height": 1024},
]


def extract_seo_data(page, url):
    """Extract all SEO-relevant meta data from the page."""
    data = {}

    # --- Viewport meta ---
    vp = page.query_selector('meta[name="viewport"]')
    data["viewport_meta"] = vp.get_attribute("content") if vp else None

    # --- Title ---
    title_el = page.query_selector("title")
    data["title"] = title_el.inner_text() if title_el else None

    # --- Meta description ---
    desc = page.query_selector('meta[name="description"]')
    data["meta_description"] = desc.get_attribute("content") if desc else None

    # --- OG tags ---
    og_tags = {}
    for prop in ["og:title", "og:description", "og:image", "og:url", "og:type", "og:site_name"]:
        el = page.query_selector(f'meta[property="{prop}"]')
        og_tags[prop] = el.get_attribute("content") if el else None
    data["og_tags"] = og_tags

    # --- Twitter card tags ---
    tw_tags = {}
    for name in ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]:
        el = page.query_selector(f'meta[name="{name}"]')
        tw_tags[name] = el.get_attribute("content") if el else None
    data["twitter_tags"] = tw_tags

    # --- Canonical ---
    canon = page.query_selector('link[rel="canonical"]')
    data["canonical"] = canon.get_attribute("href") if canon else None

    # --- Favicons ---
    favicons = []
    for sel in ['link[rel="icon"]', 'link[rel="shortcut icon"]', 'link[rel="apple-touch-icon"]']:
        els = page.query_selector_all(sel)
        for el in els:
            favicons.append({
                "rel": el.get_attribute("rel"),
                "href": el.get_attribute("href"),
                "sizes": el.get_attribute("sizes"),
                "type": el.get_attribute("type"),
            })
    data["favicons"] = favicons

    # --- Print stylesheet ---
    print_css = page.query_selector('link[media="print"]')
    data["print_stylesheet"] = print_css.get_attribute("href") if print_css else None

    # --- H1 tags ---
    h1s = page.query_selector_all("h1")
    data["h1_count"] = len(h1s)
    data["h1_texts"] = [h.inner_text().strip() for h in h1s]

    # --- H1 above the fold (desktop 1080px, mobile 812px) ---
    for h1 in h1s:
        box = h1.bounding_box()
        if box:
            data["h1_bounding_box"] = box
            break

    # --- Images audit ---
    images = page.query_selector_all("img")
    img_data = []
    for img in images:
        alt = img.get_attribute("alt")
        src = img.get_attribute("src")
        width = img.get_attribute("width")
        height = img.get_attribute("height")
        loading = img.get_attribute("loading")
        role = img.get_attribute("role")
        aria_hidden = img.get_attribute("aria-hidden")
        box = img.bounding_box()
        img_data.append({
            "src": src[:80] if src else None,
            "alt": alt,
            "alt_present": alt is not None,
            "alt_empty": alt == "",
            "role": role,
            "aria_hidden": aria_hidden,
            "width_attr": width,
            "height_attr": height,
            "loading": loading,
            "rendered_w": round(box["width"]) if box else None,
            "rendered_h": round(box["height"]) if box else None,
        })
    data["images"] = img_data
    data["images_total"] = len(img_data)
    data["images_missing_alt"] = sum(1 for i in img_data if not i["alt_present"])
    data["images_empty_alt"] = sum(1 for i in img_data if i["alt_empty"])
    data["images_missing_dimensions"] = sum(
        1 for i in img_data if not i["width_attr"] and not i["height_attr"]
    )
    data["images_lazy_loaded"] = sum(1 for i in img_data if i["loading"] == "lazy")

    # --- Links / CTA check ---
    cta_el = page.query_selector('a[href="/contact"]')
    data["cta_present"] = cta_el is not None
    if cta_el:
        box = cta_el.bounding_box()
        data["cta_bounding_box"] = box
        data["cta_text"] = cta_el.inner_text().strip()

    # --- Tap targets: find small interactive elements on mobile (< 48px) ---
    tap_issues = []
    for sel in ["a", "button"]:
        els = page.query_selector_all(sel)
        for el in els:
            box = el.bounding_box()
            if box and (box["width"] < 48 or box["height"] < 48):
                tap_issues.append({
                    "tag": sel,
                    "text": el.inner_text().strip()[:40],
                    "width": round(box["width"]),
                    "height": round(box["height"]),
                })
    data["tap_target_issues"] = tap_issues[:20]  # limit output
    data["tap_target_issue_count"] = len(tap_issues)

    # --- Horizontal scroll check ---
    scroll_width = page.evaluate("document.documentElement.scrollWidth")
    client_width = page.evaluate("document.documentElement.clientWidth")
    data["horizontal_scroll"] = scroll_width > client_width
    data["scroll_width"] = scroll_width
    data["client_width"] = client_width

    # --- Base font size ---
    body_font = page.evaluate(
        "window.getComputedStyle(document.body).fontSize"
    )
    data["body_font_size"] = body_font

    # --- Robots meta ---
    robots_el = page.query_selector('meta[name="robots"]')
    data["robots_meta"] = robots_el.get_attribute("content") if robots_el else None

    # --- Structured data ---
    ld_scripts = page.query_selector_all('script[type="application/ld+json"]')
    data["structured_data_count"] = len(ld_scripts)
    schemas = []
    for s in ld_scripts:
        try:
            obj = json.loads(s.inner_text())
            schemas.append(obj.get("@type", "unknown"))
        except Exception:
            schemas.append("parse_error")
    data["structured_data_types"] = schemas

    return data


def capture_screenshot(page, path, full_page=False):
    page.screenshot(path=path, full_page=full_page)


def run_audit():
    results = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for pg_info in PAGES:
            page_name = pg_info["name"]
            url = pg_info["url"]
            results[page_name] = {"url": url, "viewports": {}, "seo": {}}

            print(f"\n--- Auditing: {url} ---")

            for vp in VIEWPORTS:
                vp_name = vp["name"]
                context = browser.new_context(
                    viewport={"width": vp["width"], "height": vp["height"]},
                    user_agent=(
                        "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 "
                        "(KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
                        if vp_name == "mobile"
                        else "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                             "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                    ),
                )
                page = context.new_page()

                try:
                    response = page.goto(url, wait_until="networkidle", timeout=30000)
                    status = response.status if response else "no_response"
                    print(f"  [{vp_name}] Status: {status}")

                    # Above-the-fold screenshot (viewport only)
                    atf_path = os.path.join(
                        SCREENSHOTS_DIR, f"{page_name}_{vp_name}_atf.png"
                    )
                    capture_screenshot(page, atf_path, full_page=False)
                    print(f"  [{vp_name}] ATF screenshot saved: {atf_path}")

                    # Full page screenshot (desktop only to keep size manageable)
                    if vp_name == "desktop":
                        full_path = os.path.join(
                            SCREENSHOTS_DIR, f"{page_name}_{vp_name}_full.png"
                        )
                        capture_screenshot(page, full_path, full_page=True)
                        print(f"  [{vp_name}] Full screenshot saved: {full_path}")

                    results[page_name]["viewports"][vp_name] = {
                        "status": status,
                        "atf_screenshot": atf_path,
                    }

                    # Extract SEO data once (using mobile viewport for mobile checks)
                    if vp_name == "mobile":
                        results[page_name]["seo"] = extract_seo_data(page, url)
                        results[page_name]["seo"]["mobile_viewport"] = {
                            "width": vp["width"],
                            "height": vp["height"],
                        }

                except Exception as e:
                    print(f"  [{vp_name}] ERROR: {e}")
                    results[page_name]["viewports"][vp_name] = {"error": str(e)}

                finally:
                    context.close()

        browser.close()

    # Save JSON results
    json_path = os.path.join(SCREENSHOTS_DIR, "audit_results.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, default=str)
    print(f"\n\nAudit complete. Results saved to: {json_path}")
    return results


if __name__ == "__main__":
    run_audit()
