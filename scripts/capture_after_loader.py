"""Capture homepage mobile/tablet after loader completes."""
from playwright.sync_api import sync_playwright
import os

SCREENSHOTS_DIR = r"C:\Users\Karan\Desktop\Projects\Digitally next_projects\digitallynext\screenshots"

CAPTURES = [
    {"name": "homepage_mobile_loaded", "url": "https://www.digitallynext.com/", "w": 375, "h": 812, "mobile": True},
    {"name": "homepage_tablet_loaded", "url": "https://www.digitallynext.com/", "w": 768, "h": 1024, "mobile": False},
    {"name": "homepage_desktop_loaded", "url": "https://www.digitallynext.com/", "w": 1920, "h": 1080, "mobile": False},
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    for cap in CAPTURES:
        ua = (
            "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
            if cap["mobile"]
            else "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        context = browser.new_context(viewport={"width": cap["w"], "height": cap["h"]}, user_agent=ua)
        page = context.new_page()
        try:
            page.goto(cap["url"], wait_until="domcontentloaded", timeout=30000)
            # Wait for the intro loader to finish (usually 2-4 seconds)
            page.wait_for_timeout(7000)
            path = os.path.join(SCREENSHOTS_DIR, f"{cap['name']}_atf.png")
            page.screenshot(path=path, full_page=False)
            print(f"Saved: {path}")
            # Full page
            path_full = os.path.join(SCREENSHOTS_DIR, f"{cap['name']}_full.png")
            page.screenshot(path=path_full, full_page=True)
            print(f"Saved full: {path_full}")
        except Exception as e:
            print(f"Error for {cap['name']}: {e}")
        finally:
            context.close()

    browser.close()
