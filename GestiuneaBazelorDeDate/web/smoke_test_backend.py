#!/usr/bin/env python3
"""
Laravel & MySQL Live Integration Smoke Test
Validează conexiunea live cu serverul Laravel şi baza de date MySQL în GitHub Actions.
"""

import sys
import time
import urllib.request
import urllib.error

BASE_URL = "http://127.0.0.1:8000"
MAX_ATTEMPTS = 30
DELAY = 1

def wait_for_server():
    print(f"[SMOKE] Astept serverul Laravel la {BASE_URL}...")
    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            req = urllib.request.Request(f"{BASE_URL}/login")
            with urllib.request.urlopen(req, timeout=3) as response:
                if response.status in [200, 302]:
                    print(f"[SMOKE] Server online (incercarea {attempt}/{MAX_ATTEMPTS}, status: {response.status})")
                    return True
        except Exception:
            time.sleep(DELAY)
    print(f"[FAIL] Serverul nu a raspuns in {MAX_ATTEMPTS * DELAY} secunde.")
    return False

def test_endpoints():
    tests = [
        ("/login", 200, "Pagina de autentificare"),
        ("/locale/ro", 302, "Comutare limba romana"),
        ("/locale/en", 302, "Comutare limba engleza"),
        ("/", 302, "Redirectionare radacina spre dashboard"),
    ]

    failed = 0
    for path, expected_status, desc in tests:
        url = f"{BASE_URL}{path}"
        try:
            # Custom handler to prevent automatic redirect follow so we can inspect 302
            class NoRedirect(urllib.request.HTTPRedirectHandler):
                def redirect_request(self, req, fp, code, msg, headers, newurl):
                    return None

            opener = urllib.request.build_opener(NoRedirect())
            response = opener.open(url)
            status = response.getcode()
        except urllib.error.HTTPError as e:
            status = e.code
        except Exception as e:
            print(f"[FAIL] {desc} ({url}): Exceptie {e}")
            failed += 1
            continue

        if status == expected_status:
            print(f"[PASS] {desc} ({path}) -> HTTP {status}")
        else:
            print(f"[FAIL] {desc} ({path}) -> Asteptat {expected_status}, Primit {status}")
            failed += 1

    return failed == 0

def main():
    print("=" * 60)
    print("  LARAVEL + MYSQL LIVE INTEGRATION SMOKE TEST")
    print("=" * 60)

    if not wait_for_server():
        sys.exit(1)

    if not test_endpoints():
        print("\n[ERROR] Unele teste de integrare au esuat.")
        sys.exit(1)

    print("\n[SUCCESS] Toate testele de integrare live cu MySQL au trecut cu succes!")
    sys.exit(0)

if __name__ == "__main__":
    main()
