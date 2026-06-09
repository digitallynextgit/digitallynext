"""Capture homepage at desktop with domcontentloaded fallback."""
from playwright.sync_api import sync_playwright
import os

SCREENSHOTS_DIR = r"C:\Users\Karan\Desktop\Projects\Digitally next_projects\digitallynext\screenshots"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        viewport={"width": 1920, "height": 1080},
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    )
    page = context.new_page()
    try:
        page.goto("https://www.digitallynext.com/", wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(4000)
        atf = os.path.join(SCREENSHOTS_DIR, "homepage_desktop_atf.png")
        page.screenshot(path=atf, full_page=False)
        print(f"ATF saved: {atf}")
        full = os.path.join(SCREENSHOTS_DIR, "homepage_desktop_full.png")
        page.screenshot(path=full, full_page=True)
        print(f"Full saved: {full}")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        context.close()
        browser.close()
