import pandas as pd
import numpy as np
import boto3
import os

# -----------------------------
# Configuration
# -----------------------------
RAW_DATA_PATH = "s3://scale-etl-bucket-1/raw_user_data/raw_user_data.csv"
CLEAN_DATA_PATH = "s3://scale-etl-bucket-1/cleaned_user_data/clean_user_data.parquet"

# List of valid heroes
HEROES = [
    "IronMan","CaptainAmerica","Thor","BlackWidow","Hulk","Hawkeye","SpiderMan",
    "DoctorStrange","BlackPanther","ScarletWitch","Vision","AntMan","Wasp","Falcon",
    "WinterSoldier","StarLord","Gamora","Drax","Rocket","Groot","Loki","CaptainMarvel",
    "NickFury","Okoye","Shuri","TChalla","WonderWoman","Batman","Superman","Aquaman",
    "Flash","Cyborg","GreenLantern","HarleyQuinn","Joker","Deadpool","WadeWilson","Venom",
    "SpiderGwen","IronFist","LukeCage","JessicaJones","Daredevil","Elektra","ScarletJohansson",
    "ChrisEvans","ChrisHemsworth","Scar","McMende","ChrisPratt","ZoeSaldana",
    "BenedictCumberbatch","TomHolland","ChadwickBoseman","PaulRudd","TheUndertaker",
    "SamuelLJackson","BrieLarson","KarenGillan","DaveBautista","AnthonyMackie","SebastianStan",
    "TomHiddleston","Elsa","PaulBettany","JeremyRenner","HayleyAtwell","NataliePortman",
    "GalGadot","HenryCavill","BenAffleck","JasonMomoa","EzraMiller","RayFisher","MargotRobbie",
    "JaredLeto","RyanReynolds","TomHardy","ShaileneWoodley","DylanOBrien","EmmaWatson",
    "DanielRadcliffe","RobertPattinson","LuciferMorningStar","ChrisHemsworth2","MarkRuffalo","JakieChan"
]

# -----------------------------
# Helper Functions
# -----------------------------
def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean the raw user data:
    - Keep only valid heroes
    - Keep only valid ages (0-120)
    - Drop duplicates
    - Strip whitespace from names
    - Add a random 'score' column if missing
    """
    df = df.copy()
    df = df.dropna(subset=["name", "age", "hero"])
    
    # Strip whitespace
    df["name"] = df["name"].str.strip()
    df["hero"] = df["hero"].str.strip()
    
    # Filter valid heroes
    df = df[df["hero"].isin(HEROES)]
    
    # Filter valid ages
    df = df[(df["age"] >= 0) & (df["age"] <= 120)]
    
    df = df.drop_duplicates(subset=["name", "age", "hero"])
    
    if "score" not in df.columns:
        df["score"] = np.random.randint(0, 100, len(df))
        print("Added random 'score' column for training")
    
    return df

# -----------------------------
# Main ETL
# -----------------------------
def main():
    print("🔹 Starting ETL job for user data...")
    
    print("Reading raw user data from S3...")
    df_raw = pd.read_csv(RAW_DATA_PATH)
    print(f"Loaded {len(df_raw)} rows of raw data")
    
    df_clean = clean_data(df_raw)
    print(f"Cleaned data contains {len(df_clean)} rows")
    
    print("Writing cleaned data to S3...")
    df_clean.to_parquet(CLEAN_DATA_PATH, index=False)
    print(f"Cleaned user data written to {CLEAN_DATA_PATH}")

# -----------------------------
# Entry point
# -----------------------------
if __name__ == "__main__":
    main()