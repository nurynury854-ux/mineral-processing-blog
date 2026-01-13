---
title: "Python #10: Байгалийн Загварчлал - Уурхайн Усны Урсгал Симуляци"
date: "2019-05-28"
excerpt: "Python ашиглан уурхайн усны урсгалыг загварчлах, симуляци хийх арга зүй."
tags: ["Python", "Усны урсгал", "Симуляци", "Загварчлал"]
language: "mn"
views: 0
---

## Уурхайн усны асуудал

Нээлттэй уурхайд ус нь томоохон асуудал:
- Ажлын талбайд ус хуримтлагдах
- Налуу татах эрсдэл
- Ажлын нөхцөл муудах

Усны урсгалыг урьдчилан тооцоолж, зохих арга хэмжээ авах шаардлагатай.

## Загварын үндэс

### Усны тэнцвэр

$$Q_{total} = Q_{rain} + Q_{groundwater} + Q_{surface} - Q_{evap} - Q_{pump}$$

Хаана:
- $Q_{rain}$ = Хур тунадас
- $Q_{groundwater}$ = Газрын доорх ус
- $Q_{surface}$ = Гадаргын урсац
- $Q_{evap}$ = Ууршилт
- $Q_{pump}$ = Шахуургаар зайлуулах

## Python загвар

### 1. Суурь загвар

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

class MineWaterModel:
    """Уурхайн усны урсгалын загвар"""
    
    def __init__(self, pit_area, depth):
        """
        pit_area: Карьерын талбай (m²)
        depth: Гүн (m)
        """
        self.pit_area = pit_area
        self.depth = depth
        self.water_volume = 0  # Эхлэх усны хэмжээ (m³)
        
    def rainfall_inflow(self, rainfall_mm):
        """Хур тунадасны урсац"""
        return self.pit_area * rainfall_mm / 1000
    
    def groundwater_inflow(self, permeability, gradient):
        """
        Газрын доорх усны орц
        permeability: Нэвчимтгий байдал (m/day)
        gradient: Градиент
        """
        # Дарси хууль
        pit_perimeter = 4 * np.sqrt(self.pit_area)  # Энгийн тооцоолол
        return permeability * gradient * pit_perimeter * self.depth
    
    def evaporation(self, temp, humidity, wind):
        """
        Ууршилт
        temp: Температур (°C)
        humidity: Чийгшил (%)
        wind: Салхи (m/s)
        """
        # Энгийн загвар (Penman-Monteith илүү нарийн)
        evap_rate = (0.5 + 0.01 * temp - 0.005 * humidity + 0.1 * wind) / 1000
        water_surface = min(self.water_volume / 10, self.pit_area)
        return evap_rate * water_surface
    
    def pump_capacity(self, num_pumps, pump_rate):
        """
        Шахуургын хүчин чадал
        num_pumps: Тоо ширхэг
        pump_rate: Нэг шахуургын хүчин чадал (m³/hr)
        """
        return num_pumps * pump_rate / 24  # m³/day
    
    def simulate_day(self, rainfall, temp, humidity, wind, 
                     permeability, gradient, num_pumps, pump_rate):
        """Нэг өдрийн симуляци"""
        
        # Орлого
        rain_in = self.rainfall_inflow(rainfall)
        gw_in = self.groundwater_inflow(permeability, gradient)
        
        # Зарлага
        evap_out = self.evaporation(temp, humidity, wind)
        pump_out = self.pump_capacity(num_pumps, pump_rate)
        
        # Нийт өөрчлөлт
        net_change = rain_in + gw_in - evap_out - pump_out
        self.water_volume = max(0, self.water_volume + net_change)
        
        return {
            'water_volume': self.water_volume,
            'rainfall_in': rain_in,
            'groundwater_in': gw_in,
            'evaporation_out': evap_out,
            'pump_out': pump_out,
            'net_change': net_change
        }
```

### 2. Симуляци гүйцэтгэх

```python
# Карьерын өгөгдөл
pit_area = 500000  # m² (500m × 1000m)
depth = 100  # m

# Загвар үүсгэх
model = MineWaterModel(pit_area, depth)

# Цаг уурын өгөгдөл (жишээ)
np.random.seed(42)
days = 365

weather_data = pd.DataFrame({
    'day': range(1, days+1),
    'rainfall': np.random.exponential(2, days),  # mm/day
    'temperature': 15 + 10*np.sin(2*np.pi*np.arange(days)/365),  # °C
    'humidity': 60 + 20*np.random.randn(days).clip(-1, 1),  # %
    'wind': 2 + np.random.exponential(1, days)  # m/s
})

# Геологийн параметр
permeability = 0.5  # m/day
gradient = 0.1

# Шахуургын тохиргоо
num_pumps = 3
pump_rate = 500  # m³/hr

# Симуляци
results = []
for _, day_data in weather_data.iterrows():
    result = model.simulate_day(
        rainfall=day_data['rainfall'],
        temp=day_data['temperature'],
        humidity=day_data['humidity'],
        wind=day_data['wind'],
        permeability=permeability,
        gradient=gradient,
        num_pumps=num_pumps,
        pump_rate=pump_rate
    )
    result['day'] = day_data['day']
    results.append(result)

results_df = pd.DataFrame(results)
```

### 3. Үр дүн дүрслэх

```python
# График зурах
fig, axes = plt.subplots(3, 1, figsize=(12, 10))

# Усны хэмжээ
axes[0].plot(results_df['day'], results_df['water_volume'], 'b-', linewidth=2)
axes[0].axhline(y=50000, color='r', linestyle='--', label='Аюултай түвшин')
axes[0].set_ylabel('Усны хэмжээ (m³)', fontsize=12)
axes[0].set_title('Карьер дахь усны хэмжээ', fontsize=14, fontweight='bold')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Орлого/Зарлага
axes[1].plot(results_df['day'], results_df['rainfall_in'], label='Хур тунадас', alpha=0.7)
axes[1].plot(results_df['day'], results_df['groundwater_in'], label='Газрын доорх ус', alpha=0.7)
axes[1].plot(results_df['day'], results_df['evaporation_out'], label='Ууршилт', alpha=0.7)
axes[1].plot(results_df['day'], results_df['pump_out'], label='Шахуурга', alpha=0.7)
axes[1].set_ylabel('Урсгал (m³/өдөр)', fontsize=12)
axes[1].set_title('Усны орлого ба зарлага', fontsize=14, fontweight='bold')
axes[1].legend(loc='upper right')
axes[1].grid(True, alpha=0.3)

# Өдөр тутмын өөрчлөлт
axes[2].bar(results_df['day'], results_df['net_change'], 
           color=['red' if x > 0 else 'blue' for x in results_df['net_change']],
           alpha=0.6)
axes[2].axhline(y=0, color='k', linestyle='-', linewidth=0.5)
axes[2].set_xlabel('Өдөр', fontsize=12)
axes[2].set_ylabel('Өөрчлөлт (m³/өдөр)', fontsize=12)
axes[2].set_title('Өдөр тутмын усны өөрчлөлт', fontsize=14, fontweight='bold')
axes[2].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('mine_water_simulation.png', dpi=300, bbox_inches='tight')
plt.show()

# Статистик
print("\\n=== СИМУЛЯЦИЙН ҮР ДҮН ===")
print(f"\\nМаксимум усны хэмжээ: {results_df['water_volume'].max():,.0f} m³")
print(f"Дундаж усны хэмжээ: {results_df['water_volume'].mean():,.0f} m³")
print(f"Аюултай түвшнээс давсан өдөр: {(results_df['water_volume'] > 50000).sum()} өдөр")

print(f"\\nНийт хур тунадас: {results_df['rainfall_in'].sum():,.0f} m³")
print(f"Нийт газрын доорх ус: {results_df['groundwater_in'].sum():,.0f} m³")
print(f"Нийт ууршилт: {results_df['evaporation_out'].sum():,.0f} m³")
print(f"Нийт шахсан ус: {results_df['pump_out'].sum():,.0f} m³")
```

### 4. Сценарийн шинжилгээ

```python
def scenario_analysis(base_pumps, rainfall_factor):
    """Өөр өөр сценарийг харьцуулах"""
    
    scenarios = {
        'Одоогийн': (base_pumps, 1.0),
        'Хур их': (base_pumps, 1.5),
        'Шахуурга нэмэх': (base_pumps + 2, 1.0),
        'Хур их + Шахуурга нэмэх': (base_pumps + 2, 1.5)
    }
    
    results_summary = []
    
    for scenario_name, (pumps, rain_mult) in scenarios.items():
        model = MineWaterModel(pit_area, depth)
        max_volume = 0
        
        for _, day_data in weather_data.iterrows():
            result = model.simulate_day(
                rainfall=day_data['rainfall'] * rain_mult,
                temp=day_data['temperature'],
                humidity=day_data['humidity'],
                wind=day_data['wind'],
                permeability=permeability,
                gradient=gradient,
                num_pumps=pumps,
                pump_rate=pump_rate
            )
            max_volume = max(max_volume, model.water_volume)
        
        results_summary.append({
            'Сценари': scenario_name,
            'Шахуурга': pumps,
            'Хур тунадас': f"{rain_mult}×",
            'Макс ус (m³)': f"{max_volume:,.0f}",
            'Аюултай эсэх': '✗' if max_volume > 50000 else '✓'
        })
    
    return pd.DataFrame(results_summary)

# Сценари харьцуулах
comparison = scenario_analysis(num_pumps, 1.0)
print("\\n=== СЦЕНАРИЙН ХАРЬЦУУЛАЛТ ===\\n")
print(comparison.to_string(index=False))
```

## Практик зөвлөмж

### 1. Өгөгдөл цуглуулах
- Цаг уурын станц суурилуулах
- Усны түвшин хэмжих
- Урсгалын хэмжилт

### 2. Шахуургын менежмент
- Нөөц шахуурга байх
- Засвар, үйлчилгээ тогтмол хийх
- Автомат удирдлага

### 3. Сэргийлэх арга хэмжээ
- Усны зам, сувгийн систем
- Дотоод зайлуулах систем
- Налууг бэхжүүлэх

## Дүгнэлт

Python ашиглан уурхайн усны урсгалыг загварчлах нь:
- Эрсдэлийг бууруулах
- Зөв шийдвэр гаргах
- Зардал хэмнэх

Энгийн загвараас эхлээд, аажмаар нарийн болгож болно. Өөрийн уурхайн нөхцөлд тохируулах нь чухал.
