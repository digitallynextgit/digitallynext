"""Capture all pages after loader, extract full SEO data."""
from playwright.sync_api import sync_playwright
import os, json

SCREENSHOTS_DIR = r"C:\Users\Karan\Desktop\Projects\Digitally next_projects\digitallynext\screenshots"

PAGES = [
    {"name": "seo_service", "url": "https://www.digitallynext.com/services/seo-optimization"},
    {"name": "blog", "url": "https://www.digitallynext.com/blog"},
]

VIEWPORTS = [
    {"name": "mobile", "w": 375, "h": 812, "mobile": True},
    {"name": "desktop", "w": 1920, "h": 1080, "mobile": False},
]

def extract_seo(page):
    data = {}
    vp_el = page.query_selector('meta[name="viewport"]')
    data["viewport_meta"] = vp_el.get_attribute("content") if vp_el else None
    title_el = page.query_selector("title")
    data["title"] = title_el.inner_text() if title_el else None
    desc = page.query_selector('meta[name="description"]')
    data["meta_description"] = desc.get_attribute("content") if desc else None
    og = {}
    for prop in ["og:title","og:description","og:image","og:url","og:type"]:
        el = page.query_selector(f'meta[property="{prop}"]')
        og[prop] = el.get_attribute("content") if el else None
    data["og"] = og
    tw = {}
    for name in ["twitter:card","twitter:title","twitter:description","twitter:image"]:
        el = page.query_selector(f'meta[name="{name}"]')
        tw[name] = el.get_attribute("content") if el else None
    data["twitter"] = tw
    canon = page.query_selector('link[rel="canonical"]')
    data["canonical"] = canon.get_attribute("href") if canon else None
    favicons = []
    for sel in ['link[rel="icon"]','link[rel="shortcut icon"]','link[rel="apple-touch-icon"]']:
        for el in page.query_selector_all(sel):
            favicons.append({"rel": el.get_attribute("rel"), "href": el.get_attribute("href"), "sizes": el.get_attribute("sizes")})
    data["favicons"] = favicons
    h1s = page.query_selector_all("h1")
    data["h1_count"] = len(h1s)
    data["h1_texts"] = [h.inner_text().strip() for h in h1s]
    h1_boxes = []
    for h in h1s:
        b = h.bounding_box()
        if b: h1_boxes.append(b)
    data["h1_boxes"] = h1_boxes
    imgs = page.query_selector_all("img")
    img_data = []
    for img in imgs:
        alt = img.get_attribute("alt")
        src = img.get_attribute("src")
        w = img.get_attribute("width")
        h_a = img.get_attribute("height")
        loading = img.get_attribute("loading")
        aria = img.get_attribute("aria-hidden")
        box = img.bounding_box()
        img_data.append({
            "src": (src or "")[:80],
            "alt": alt,
            "alt_present": alt is not None,
            "alt_empty": alt == "",
            "aria_hidden": aria,
            "width_attr": w,
            "height_attr": h_a,
            "loading": loading,
            "rendered_w": round(box["width"]) if box else None,
            "rendered_h": round(box["height"]) if box else None,
        })
    data["images_total"] = len(img_data)
    data["images_missing_alt"] = sum(1 for i in img_data if not i["alt_present"])
    data["images_empty_alt"] = sum(1 for i in img_data if i["alt_empty"])
    data["images_missing_dims"] = sum(1 for i in img_data if not i["width_attr"] and not i["height_attr"])
    data["images_lazy"] = sum(1 for i in img_data if i["loading"] == "lazy")
    data["image_samples"] = img_data[:10]
    cta = page.query_selector('a[href="/contact"]')
    data["cta_present"] = cta is not None
    if cta:
        b = cta.bounding_box()
        data["cta_box"] = b
        data["cta_text"] = cta.inner_text().strip()
    tap_issues = []
    for sel in ["a","button"]:
        for el in page.query_selector_all(sel):
            b = el.bounding_box()
            if b and (b["width"] < 48 or b["height"] < 48):
                tap_issues.append({"tag": sel, "text": el.inner_text().strip()[:40], "w": round(b["width"]), "h": round(b["height"])})
    data["tap_issues_count"] = len(tap_issues)
    data["tap_issues_sample"] = tap_issues[:10]
    sw = page.evaluate("document.documentElement.scrollWidth")
    cw = page.evaluate("document.documentElement.clientWidth")
    data["horizontal_scroll"] = sw > cw
    data["scroll_width"] = sw
    data["client_width"] = cw
    data["body_font_size"] = page.evaluate("window.getComputedStyle(document.body).fontSize")
    ld = page.query_selector_all('script[type="application/ld+json"]')
    data["structured_data_count"] = len(ld)
    schemas = []
    for s in ld:
        try:
            obj = json.loads(s.inner_text())
            schemas.append(obj.get("@type","unknown"))
        except: schemas.append("parse_error")
    data["structured_data_types"] = schemas
    robots_el = page.query_selector('meta[name="robots"]')
    data["robots_meta"] = robots_el.get_attribute("content") if robots_el else None
    return data

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    all_results = {}
    for pg in PAGES:
        all_results[pg["name"]] = {}
        for vp in VIEWPORTS:
            ua = (
                "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
                if vp["mobile"] else
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
            ctx = browser.new_context(viewport={"width": vp["w"], "height": vp["h"]}, user_agent=ua)
            page = ctx.new_page()
            try:
                page.goto(pg["url"], wait_until="domcontentloaded", timeout=30000)
                page.wait_for_timeout(8000)
                atf_path = os.path.join(SCREENSHOTS_DIR, f"{pg['name']}_{vp['name']}_loaded_atf.png")
                page.screenshot(path=atf_path, full_page=False)
                print(f"Saved: {atf_path}")
                if vp["name"] == "desktop":
                    full_path = os.path.join(SCREENSHOTS_DIR, f"{pg['name']}_{vp['name']}_loaded_full.png")
                    page.screenshot(path=full_path, full_page=True)
                    print(f"Saved full: {full_path}")
                seo = extract_seo(page)
                all_results[pg["name"]][vp["name"]] = seo
            except Exception as e:
                print(f"ERROR {pg['name']} {vp['name']}: {e}")
            finally:
                ctx.close()
    browser.close()
    out = os.path.join(SCREENSHOTS_DIR, "seo_details.json")
    with open(out, "w") as f:
        json.dump(all_results, f, indent=2, default=str)
    print(f"\nSEO details saved: {out}")
    print(json.dumps(all_results, indent=2, default=str))
