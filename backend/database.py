import sqlite3
conn = sqlite3.connect('rental.db')
cursor = conn.cursor()

cursor.execute("""
               CREATE TABLE IF NOT EXISTS projects (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               name TEXT NOT NULL,
               completed BOOLEAN DEFAULT 0
               )
               """)
cursor.execute("""CREATE TABLE IF NOT EXISTS phases (
               id INTEGER PRIMARY KEY AUTOINCREMENT, 
               project_id INTEGER NOT NULL, 
               name TEXT NOT NULL, 
               completed BOOLEAN DEFAULT 0
               )
               """)
cursor.execute("""CREATE TABLE IF NOT EXISTS tasks ( 
               id INTEGER PRIMARY KEY AUTOINCREMENT, 
               phase_id INTEGER NOT NULL, 
               name TEXT NOT NULL,  
               completed BOOLEAN DEFAULT 0
               )
               """)