#!/usr/bin/env python3
"""
extract_leaderboard_csv.py

Fetches the table with a given HTML id from a page and writes it to CSV.
Defaults to the SWE-bench page and the table id 'leaderboard-bash-only'.
"""

import sys
import argparse
import requests
from bs4 import BeautifulSoup
import pandas as pd

DEF_URL = "https://www.swebench.com/"
DEF_TABLE_ID = "leaderboard-bash-only"
DEF_OUT = "leaderboard-bash-only.csv"

def fetch_html(url: str) -> str:
    headers = {
        # A friendly UA helps avoid being blocked by some sites/CDNs
        "User-Agent": (
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
        )
    }
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()
    return resp.text

def extract_table_html(html: str, table_id: str) -> str:
    soup = BeautifulSoup(html, "lxml")
    table = soup.find("table", id=table_id)
    if table is None:
        # Try dataframes read_html fallback (less strict) as a second attempt
        return None
    return str(table)

def table_to_dataframe(table_html: str, url_context: str) -> pd.DataFrame:
    # pandas.read_html returns a list of DataFrames; we want the first one
    # Using the page URL as 'flavor context' so it can resolve relative links if needed
    dfs = pd.read_html(table_html, flavor="lxml")
    if not dfs:
        raise ValueError("No tabular data found inside the specified table.")
    df = dfs[0]
    # Normalize column names (strip whitespace)
    df.columns = [str(c).strip() for c in df.columns]
    return df

def main():
    parser = argparse.ArgumentParser(description="Extract an HTML table (by id) to CSV.")
    parser.add_argument("--url", default=DEF_URL, help="Page URL (default: %(default)s)")
    parser.add_argument("--table-id", default=DEF_TABLE_ID, help="Table id to extract (default: %(default)s)")
    parser.add_argument("--out", default=DEF_OUT, help="Output CSV path (default: %(default)s)")
    parser.add_argument("--sep", default=",", help="CSV delimiter (default: %(default)s)")
    args = parser.parse_args()

    try:
        html = fetch_html(args.url)
    except Exception as e:
        print(f"Error fetching URL: {e}", file=sys.stderr)
        sys.exit(1)

    table_html = extract_table_html(html, args.table_id)
    if table_html is None:
        print(
            f"Could not find a <table> with id='{args.table_id}'. "
            f"Check the page or try a different id.",
            file=sys.stderr,
        )
        sys.exit(2)

    try:
        df = table_to_dataframe(table_html, args.url)
    except Exception as e:
        print(f"Error parsing table HTML: {e}", file=sys.stderr)
        sys.exit(3)

    try:
        df.to_csv(args.out, index=False, sep=args.sep)
    except Exception as e:
        print(f"Error writing CSV: {e}", file=sys.stderr)
        sys.exit(4)

    print(f"Wrote {len(df)} rows to {args.out}")

if __name__ == "__main__":
    main()
