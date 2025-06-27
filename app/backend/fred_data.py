from fredapi import Fred

fred = Fred(api_key='INSERT API KEY HERE')

# Get FRED Data

def get_series_data(series_id: str):
    return fred.get_series(series_id)