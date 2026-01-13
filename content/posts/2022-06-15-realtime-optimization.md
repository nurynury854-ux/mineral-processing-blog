---
title: "Баяжуулах үйлдвэрийн Real-time Optimization - Дижитал Ирээдүй"
date: "2022-06-15"
excerpt: "Орчин үеийн баяжуулах үйлдвэрт real-time optimization технологи нэвтрүүлэх арга зам, дижитал шилжилтийн боломж."
tags: ["Digital", "Optimization", "Real-time", "Industry 4.0"]
language: "mn"
views: 0
---

## Баяжуулалтын дижитал шилжилт

Уламжлал арга:
- Хүний мэдрэмж
- Лабораторийн шинжилгээ (удаан)
- Өдөр тутмын тохиргоо

Шинэ арга:
- **Real-time** мэдрэгч
- **AI/ML** алгоритм
- **Автомат** тохиргоо

## Технологийн бүрэлдэхүүн

### 1. Сенсор & Мониторинг

**Онлайн мэдрэгч:**
```
┌─────────────────┐
│ Тэжээл          │
│ - Чанар (XRF)   │
│ - Урсгал        │
│ - Ширхэглэл     │
└────────┬────────┘
         │
┌────────▼────────┐
│ Процесс         │
│ - pH, Eh        │
│ - Агаарын урсгал│
│ - Хэмх          │
│ - Температур    │
└────────┬────────┘
         │
┌────────▼────────┐
│ Баяжмал         │
│ - Чанар (XRF)   │
│ - Гарц          │
│ - Чийгшил       │
└─────────────────┘
```

**IoT Integration:**
```python
import paho.mqtt.client as mqtt
import json
from datetime import datetime

class SensorNetwork:
    """Сенсорын сүлжээ"""
    
    def __init__(self, broker_address):
        self.client = mqtt.Client()
        self.client.on_message = self.on_message
        self.client.connect(broker_address)
        self.data = {}
        
    def on_message(self, client, userdata, message):
        """MQTT мессеж хүлээн авах"""
        topic = message.topic
        payload = json.loads(message.payload)
        
        self.data[topic] = {
            'value': payload['value'],
            'timestamp': datetime.now(),
            'unit': payload.get('unit', '')
        }
        
        # Real-time шинжилгээ
        self.analyze_data(topic, payload['value'])
        
    def analyze_data(self, sensor, value):
        """Өгөгдөл шинжлэх"""
        thresholds = {
            'flotation/pH': (8.0, 11.0),
            'flotation/air_rate': (100, 300),
            'concentrate/grade': (20, None)  # Доод хязгаар
        }
        
        if sensor in thresholds:
            min_val, max_val = thresholds[sensor]
            
            if min_val and value < min_val:
                self.trigger_alarm(sensor, value, 'TOO_LOW')
            elif max_val and value > max_val:
                self.trigger_alarm(sensor, value, 'TOO_HIGH')
    
    def trigger_alarm(self, sensor, value, alarm_type):
        """Дохио өгөх"""
        print(f"⚠️ ALARM: {sensor} = {value} ({alarm_type})")
        # SMS, email, notification гэх мэт

# Ашиглах
network = SensorNetwork('mqtt.plant.local')
network.client.subscribe('flotation/#')
network.client.subscribe('concentrate/#')
network.client.loop_start()
```

### 2. Дата Analytics Platform

**Architecture:**
```
┌──────────────┐
│  Сенсорууд   │
└──────┬───────┘
       │
┌──────▼───────┐      ┌─────────────┐
│ Edge Device  │──────►│  Cloud DB   │
│ (Raspberry)  │      │ (TimeSeries)│
└──────┬───────┘      └──────┬──────┘
       │                     │
┌──────▼───────┐      ┌─────▼───────┐
│ Local Server │◄─────┤  Analytics  │
│ (Dashboard)  │      │  Engine     │
└──────────────┘      └─────┬───────┘
                            │
                      ┌─────▼───────┐
                      │ Optimization│
                      │   Model     │
                      └─────────────┘
```

**Implementation:**
```python
import pandas as pd
import numpy as np
from influxdb import InfluxDBClient
from sklearn.ensemble import RandomForestRegressor

class ProcessOptimizer:
    """Процессыг оновчтой болгогч"""
    
    def __init__(self, influx_config):
        self.db = InfluxDBClient(**influx_config)
        self.model = RandomForestRegressor(n_estimators=100)
        self.is_trained = False
        
    def get_historical_data(self, hours=24):
        """Түүхэн өгөгдөл татах"""
        query = f'''
            SELECT * FROM flotation_data
            WHERE time > now() - {hours}h
        '''
        result = self.db.query(query)
        df = pd.DataFrame(result.get_points())
        return df
    
    def train_model(self):
        """Загвар сургах"""
        # Сүүлийн 30 хоногийн өгөгдөл
        data = self.get_historical_data(hours=720)
        
        # Features & Target
        features = ['collector_dosage', 'frother_dosage', 
                   'air_rate', 'pH', 'feed_grade']
        target = 'recovery'
        
        X = data[features]
        y = data[target]
        
        # Сургах
        self.model.fit(X, y)
        self.is_trained = True
        
        # Үнэлгээ
        score = self.model.score(X, y)
        print(f"Model R² score: {score:.3f}")
        
    def optimize_parameters(self, current_conditions):
        """Оновчтой параметр олох"""
        if not self.is_trained:
            self.train_model()
        
        # Parameter space
        collector_range = np.arange(50, 151, 10)
        frother_range = np.arange(10, 51, 5)
        air_range = np.arange(100, 301, 20)
        
        best_recovery = 0
        best_params = None
        
        # Grid search
        for collector in collector_range:
            for frother in frother_range:
                for air in air_range:
                    params = [[
                        collector, frother, air,
                        current_conditions['pH'],
                        current_conditions['feed_grade']
                    ]]
                    
                    predicted_recovery = self.model.predict(params)[0]
                    
                    if predicted_recovery > best_recovery:
                        best_recovery = predicted_recovery
                        best_params = {
                            'collector': collector,
                            'frother': frother,
                            'air_rate': air,
                            'predicted_recovery': predicted_recovery
                        }
        
        return best_params
    
    def auto_adjust(self, current_conditions):
        """Автомат тохируулга"""
        optimal = self.optimize_parameters(current_conditions)
        
        print("\\n=== OPTIMIZATION RECOMMENDATION ===")
        print(f"Current Recovery: {current_conditions.get('recovery', 0):.1f}%")
        print(f"Predicted Recovery: {optimal['predicted_recovery']:.1f}%")
        print(f"\\nRecommended Settings:")
        print(f"  Collector: {optimal['collector']} g/t")
        print(f"  Frother: {optimal['frother']} g/t")
        print(f"  Air Rate: {optimal['air_rate']} L/min")
        
        # PLC руу команд илгээх (жишээ)
        # self.send_to_plc(optimal)
        
        return optimal

# Ашиглах
optimizer = ProcessOptimizer({
    'host': 'localhost',
    'port': 8086,
    'database': 'plant_data'
})

# Одоогийн нөхцөл
current = {
    'pH': 10.5,
    'feed_grade': 1.2,
    'recovery': 85.3
}

# Оновчлох
recommendation = optimizer.auto_adjust(current)
```

### 3. Machine Learning Models

**Predictive Models:**

```python
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

class RecoveryPredictor:
    """Авалтыг таамаглагч"""
    
    def __init__(self):
        self.model = GradientBoostingRegressor(
            n_estimators=200,
            learning_rate=0.05,
            max_depth=5,
            random_state=42
        )
        
    def prepare_features(self, data):
        """Feature engineering"""
        # Үндсэн features
        features = data[[
            'collector_dosage', 'frother_dosage', 'air_rate',
            'pH', 'feed_grade', 'feed_tonnage', 'grind_size'
        ]].copy()
        
        # Нэмэлт features
        features['collector_per_grade'] = features['collector_dosage'] / features['feed_grade']
        features['air_per_ton'] = features['air_rate'] / features['feed_tonnage']
        features['dosage_ratio'] = features['collector_dosage'] / features['frother_dosage']
        
        # Цаг хугацааны features
        features['hour'] = pd.to_datetime(data['timestamp']).dt.hour
        features['day_of_week'] = pd.to_datetime(data['timestamp']).dt.dayofweek
        
        return features
    
    def train(self, historical_data):
        """Сургах"""
        X = self.prepare_features(historical_data)
        y = historical_data['recovery']
        
        # Train/Test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Сургах
        self.model.fit(X_train, y_train)
        
        # Үнэлгээ
        train_pred = self.model.predict(X_train)
        test_pred = self.model.predict(X_test)
        
        print("\\n=== MODEL PERFORMANCE ===")
        print(f"Train R²: {r2_score(y_train, train_pred):.3f}")
        print(f"Test R²: {r2_score(y_test, test_pred):.3f}")
        print(f"Test MAE: {mean_absolute_error(y_test, test_pred):.2f}%")
        
        # Feature importance
        importance = pd.DataFrame({
            'feature': X.columns,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print("\\n=== TOP FEATURES ===")
        print(importance.head(5).to_string(index=False))
        
        # Хадгалах
        joblib.dump(self.model, 'recovery_model.pkl')
        
    def predict(self, conditions):
        """Таамаглах"""
        X = self.prepare_features(pd.DataFrame([conditions]))
        return self.model.predict(X)[0]

# Ашиглах
predictor = RecoveryPredictor()

# Түүхэн өгөгдөл татаж сургах
historical_data = pd.read_csv('plant_data_30days.csv')
predictor.train(historical_data)

# Таамаглал хийх
new_conditions = {
    'collector_dosage': 80,
    'frother_dosage': 25,
    'air_rate': 200,
    'pH': 10.2,
    'feed_grade': 1.5,
    'feed_tonnage': 100,
    'grind_size': 80,
    'timestamp': '2022-06-15 14:00:00'
}

predicted_recovery = predictor.predict(new_conditions)
print(f"\\nПредicted Recovery: {predicted_recovery:.1f}%")
```

## Хэрэгжүүлэх алхам

### Phase 1: Мониторинг (3-6 сар)
1. Гол мэдрэгч суурилуулах
2. Өгөгдөл цуглуулах систем
3. Dashboard бүтээх
4. Багийг сургах

### Phase 2: Analytics (6-12 сар)
1. ML загварууд бүтээх
2. Түүхэн өгөгдөл шинжлэх
3. Pattern таних
4. Optimization алгоритм

### Phase 3: Automation (12-18 сар)
1. PLC холбох
2. Auto control system
3. Closed-loop optimization
4. Бүрэн хяналт

## ROI тооцоолол

**Өгөгдөл:**
- Үйлдвэр: 1000 т/өдөр
- Авалт: 85% → 87% (+2%)
- Металлын үнэ: $8000/тонн
- Агуулга: 1.5%

**Improvement:**
```python
# Нэмэгдэх металл
daily_ore = 1000  # тонн/өдөр
grade = 0.015
metal_price = 8000  # $/тонн

base_recovery = 0.85
new_recovery = 0.87
improvement = new_recovery - base_recovery

daily_metal_gain = daily_ore * grade * improvement
annual_metal_gain = daily_metal_gain * 350  # ажлын өдөр

annual_value = annual_metal_gain * metal_price

print(f"Өдөр тутмын нэмэгдэл: {daily_metal_gain:.2f} т металл")
print(f"Жилийн нэмэгдэл: {annual_metal_gain:.1f} т металл")
print(f"Үнийн дүн: ${annual_value:,.0f}")

# CAPEX
sensors_cost = 200000
software_cost = 150000
installation = 100000
total_capex = sensors_cost + software_cost + installation

# Payback
payback_months = (total_capex / annual_value) * 12

print(f"\\nCAPEX: ${total_capex:,}")
print(f"Payback: {payback_months:.1f} сар")
```

## Дүгнэлт

Real-time optimization нь:
- ✅ Авалт нэмэгдүүлэх (1-3%)
- ✅ Урвалж хэмнэх (10-20%)
- ✅ Тогтвортой байдал
- ✅ Оператор дэмжих
- ✅ Богино payback (<1 жил)

Дижитал шилжилт зайлшгүй. Эрт эхэлсэн компани өрсөлдөх давуу талтай болно.
