---
title: "Уул уурхайн өгөгдөл шинжлэх ухааны хэрэглээ, боломж (Data Science in Mining)"
date: "2017-10-18"
excerpt: "Өгөгдөл шинжлэх ухааныг (Data Science) уул уурхайн салбарт хэрхэн хэрэглэж, ямар боломжууд байгаа талаар."
tags: ["Data Science", "Уул уурхай", "Machine Learning", "Analytics"]
language: "mn"
views: 0
---

## Өгөгдөл шинжлэх ухаан

Data Science нь өгөгдлөөс утга, ач холбогдол гарган авах шинжлэх ухаан юм. Статистик, програмчлал, домайн мэдлэгийг хослуулдаг.

### Гол чиглэлүүд:

**1. Тайлбарлах (Descriptive)**
- Юу болсон?
- Visualization
- Дашбоард

**2. Таамаглах (Predictive)**
- Юу болох вэ?
- Machine Learning
- Цаг хугацааны цуваа

**3. Зөвлөх (Prescriptive)**
- Яах вэ?
- Оптимизаци
- Симуляци

## Уул уурхайд өгөгдөл

### Өгөгдлийн эх үүсвэр:

**1. Үйлдвэрлэлийн өгөгдөл:**
- SCADA систем
- Мэдрэгч (sensors)
- Тоног төхөөрөмжийн өгөгдөл

**2. Геологийн өгөгдөл:**
- Өрөмдлөг
- Химийн шинжилгээ
- Геофизик

**3. Ажиллагааны өгөгдөл:**
- GPS мэдээлэл
- Ажилтны цагийн бүртгэл
- Засварын түүх

## Хэрэглээний салбарууд

### 1. Тоног төхөөрөмжийн засвар

**Асуудал:**
Гэнэтийн эвдрэл → үйлдвэрлэл зогсох → алдагдал их

**Шийдэл: Predictive Maintenance**

```python
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Өгөгдөл уншиx
data = pd.read_csv('equipment_data.csv')

# Шинж чанарууд
features = ['temperature', 'vibration', 'pressure', 
            'runtime_hours', 'load']
X = data[features]
y = data['failure_next_week']

# Загвар сургах
model = RandomForestClassifier(n_estimators=100)
model.fit(X, y)

# Таамаглах
current_state = [[85, 0.5, 120, 5000, 0.8]]
failure_prob = model.predict_proba(current_state)[0][1]

if failure_prob > 0.7:
    print(f"⚠️ Анхааруулга: Эвдрэх магадлал {failure_prob:.1%}")
    print("Засвар хийх шаардлагатай!")
```

**Үр дүн:**
- Зогсолтыг 30-50% бууруулах
- Засварын зардал бууруулах
- Ашиглалтын хугацаа нэмэгдүүлэх

### 2. Үйлдвэрлэлийн оптимизаци

**Асуудал:**
Баяжуулах үйлдвэрийн процесс олон хувьсагчтай, оновчтой параметр олох хэцүү

**Шийдэл: Process Optimization**

```python
import numpy as np
from scipy.optimize import minimize

def recovery_function(params):
    """Нөхөн авалтын функц"""
    grind_size, collector, frother, air = params
    
    # Энгийн загвар (бодитоор илүү нарийн)
    recovery = (
        0.3 * (1 / grind_size) + 
        0.2 * collector + 
        0.15 * frother + 
        0.1 * air - 
        0.01 * grind_size * collector
    )
    
    return -recovery  # Maximize болгоход negative

# Хязгаарлалтууд
bounds = [
    (50, 150),   # grind size (microns)
    (50, 150),   # collector (g/t)
    (10, 50),    # frother (g/t)
    (100, 300)   # air (L/min)
]

# Оптимизаци
result = minimize(
    recovery_function,
    x0=[100, 100, 30, 200],
    bounds=bounds,
    method='L-BFGS-B'
)

print("Оновчтой параметрүүд:")
print(f"Нунтаглалт: {result.x[0]:.1f} µm")
print(f"Collector: {result.x[1]:.1f} g/t")
print(f"Frother: {result.x[2]:.1f} g/t")
print(f"Агаар: {result.x[3]:.1f} L/min")
print(f"Авалт: {-result.fun:.2%}")
```

### 3. Геологийн загварчлал

**Асуудал:**
Хязгаарлагдмал өрөмдлөгөөс бүх ордын загвар үүсгэх

**Шийдэл: Geostatistics + ML**

```python
from sklearn.ensemble import GradientBoostingRegressor
import numpy as np

# Өрөмдлөгийн өгөгдөл
drill_data = pd.DataFrame({
    'x': [100, 150, 200, 250],
    'y': [100, 120, 110, 130],
    'z': [50, 48, 52, 49],
    'grade': [2.5, 3.1, 2.8, 3.4]
})

# Шинж чанарууд
X = drill_data[['x', 'y', 'z']]
y = drill_data['grade']

# Загвар
model = GradientBoostingRegressor(n_estimators=100)
model.fit(X, y)

# Блок загвар
x_grid = np.arange(0, 300, 10)
y_grid = np.arange(0, 200, 10)
z_grid = np.arange(0, 100, 10)

# Таамаглах
predictions = []
for x in x_grid:
    for y in y_grid:
        for z in z_grid:
            pred = model.predict([[x, y, z]])[0]
            predictions.append([x, y, z, pred])

# Нөөцийн тооцоо
block_volume = 10 * 10 * 10  # m³
density = 2.7  # t/m³
cutoff = 1.5  # g/t

tonnage = sum(1 for p in predictions if p[3] > cutoff) * block_volume * density
avg_grade = np.mean([p[3] for p in predictions if p[3] > cutoff])

print(f"Нөөц: {tonnage:,.0f} тонн")
print(f"Дундаж агуулга: {avg_grade:.2f} g/t")
```

### 4. Аюулгүй байдал

**Асуудал:**
Осол гарахыг урьдчилан мэдэж, сэргийлэх

**Шийдэл: Safety Analytics**

```python
# Өгөгдөл: Ажилтны идэвх, орчны нөхцөл
safety_data = pd.DataFrame({
    'fatigue_score': [3, 7, 5, 8, 9],
    'weather_risk': [2, 3, 7, 8, 2],
    'equipment_age': [5, 15, 8, 20, 3],
    'training_months': [12, 2, 6, 1, 18],
    'incident': [0, 0, 1, 1, 0]
})

# Логистик регресс
from sklearn.linear_model import LogisticRegression

X = safety_data.drop('incident', axis=1)
y = safety_data['incident']

model = LogisticRegression()
model.fit(X, y)

# Өнөөдрийн нөхцөл
today = [[6, 8, 12, 4]]
risk = model.predict_proba(today)[0][1]

if risk > 0.5:
    print(f"⚠️ Өндөр эрсдэл: {risk:.1%}")
    print("Нэмэлт арга хэмжээ авах!")
```

## Боломжууд

### 1. Бүтээмж нэмэгдүүлэх

**Тээврийн оптимизаци:**
- Ачааны машины маршрут
- Хий, шатахууны хэмнэлт
- Ачилтын оптимизаци

**Өрөмдлөгийн оптимизаци:**
- Drill pattern
- Тэсэлгээний параметр
- Унааны оптимизаци

### 2. Зардал бууруулах

**Эрчим хүч:**
- Тээрэм, бутлуурын оптимизаци
- Оргилын цаг хэмнэх
- Энергийн үр ашиг

**Материал:**
- Урвалжийн хэрэглээ
- Хар бөмбөлөгийн хэрэглээ
- Сэлбэг хэрэгсэл

### 3. Аюулгүй байдал

**Таамаглах:**
- Эрсдэлтэй нөхцөл
- Осол гарах магадлал
- Сэргийлэх арга хэмжээ

### 4. Байгаль орчин

**Мониторинг:**
- Ус, агаарын чанар
- Хог хаягдал
- Сэргээн босголт

## Хэрэгжүүлэх алхам

### 1. Өгөгдөл цуглуулах

**Инфраструктур:**
- Сенсор суурилуулах
- SCADA систем
- Өгөгдлийн сан

**Чанар:**
- Бүрэн эсэх
- Үнэн зөв эсэх
- Цаг хугацаа

### 2. Баг бүрдүүлэх

**Мэргэжилтэн:**
- Data scientist
- Domain expert (уул уурхайч)
- Software engineer

**Сургалт:**
- Ажилтнуудыг сургах
- Хэрэгсэл судлах
- Жишээ төслүүд

### 3. Жижиг төсөл эхлэх

**Pilot project:**
- Нэг асуудал сонгох
- Богино хугацаа
- Үр дүн хэмжих

**Өргөтгөх:**
- Амжилттай бол өргөжүүлэх
- Бусад салбарт нэвтрүүлэх

## Сорилт

### 1. Өгөгдлийн асуудал

- Чанаргүй өгөгдөл
- Хангалтгүй хэмжээ
- Салангид систем

### 2. Хүний нөөц

- Мэргэжилтэн дутагдал
- Сургалт хэрэгтэй
- Өртөг өндөр

### 3. Технологи

- Суулгалт хэцүү
- Засвар, үйлчилгээ
- Устгагдсан өгөгдөл

### 4. Менежмент

- Ойлголт дутмаг
- Өөрчлөлтөөс айх
- Богино хугацааны бодол

## Дүгнэлт

Өгөгдөл шинжлэх ухаан уул уурхайн салбарт асар их боломж нээж байна:

✅ Бүтээмж нэмэгдүүлэх  
✅ Зардал бууруулах  
✅ Аюулгүй байдал сайжруулах  
✅ Байгаль орчин хамгаалах  

Технологи хөгжиж, өгөгдөл ихсэж байна. Одоо эхэлсэн компаниуд өрсөлдөх давуу талтай болно.

Монголын уул уурхайн компаниуд энэ чиглэлд анхаарч, хөрөнгө оруулах шаардлагатай. Цаг хугацаа нь яг одоо!
