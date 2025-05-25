from fredapi import Fred
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px

fred = Fred(api_key='83f734ea6e1e9b6f29d660cdc72c19c4')

# Get FRED Data

def get_series_data(series_id: str):
    return fred.get_series(series_id)