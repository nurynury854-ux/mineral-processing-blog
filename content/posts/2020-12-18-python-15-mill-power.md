---
title: "Python #15: Тээрмийн хүчин чадал, эрчим хүчний тооцоолол"
date: "2020-12-18"
excerpt: "Бөмбөлөгт тээрмийн хүчин чадал, эрчим хүчний хэрэглээг Python-оор тооцоолох арга зүй."
tags: ["Python", "Тээрэм", "Эрчим хүч", "Тооцоолол"]
language: "mn"
views: 0
---

## Бөмбөлөгт тээрэм

Бөмбөлөгт тээрэм (Ball Mill) нь баяжуулалтын гол тоног төхөөрөмж. Эрчим хүчний зарцуулалт их учир зөв тооцоолох чухал.

## Үндсэн параметрүүд

### Тээрмийн хэмжээс:
- Диаметр (D)
- Урт (L)
- Эргэлтийн хурд (rpm)

### Материал:
- Тэжээлийн хэмжээ (т/цаг)
- Нягт (т/м³)
- Чийгшил (%)

## Хүчин чадлын тооцоолол

### 1. Bond-ын арга

Bond-ын томъёо:

$$W = 10 \\times W_i \\times \\left(\\frac{1}{\\sqrt{P_{80}}} - \\frac{1}{\\sqrt{F_{80}}}\\right)$$

Хаана:
- $W$ = Эрчим хүч (kWh/тонн)
- $W_i$ = Bond Work Index
- $P_{80}$ = Гарцын 80% нэвтрэх хэмжээ (мкм)
- $F_{80}$ = Тэжээлийн 80% нэвтрэх хэмжээ (мкм)

### Python код:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def bond_work_index(material_type):
    """Материалын Bond Work Index"""
    wi_values = {
        'зэс': 13.13,
        'алт': 15.00,
        'төмөр': 12.84,
        'нүүрс': 11.37,
        'цемент': 13.45
    }
    return wi_values.get(material_type, 15.0)

def calculate_grinding_energy(F80, P80, wi):
    """
    Bond-ын томъёогоор эрчим хүч тооцоолох
    
    Parameters:
    -----------
    F80: Тэжээл (микрон)
    P80: Гарц (микрон)
    wi: Bond Work Index
    
    Returns:
    --------
    Эрчим хүч (kWh/тонн)
    """
    energy = 10 * wi * (1/np.sqrt(P80) - 1/np.sqrt(F80))
    return energy

# Жишээ
material = 'зэс'
F80 = 1000  # мкм (1мм)
P80 = 75    # мкм
wi = bond_work_index(material)

energy_kwh_t = calculate_grinding_energy(F80, P80, wi)
print(f"Материал: {material}")
print(f"Тэжээл F80: {F80} мкм")
print(f"Гарц P80: {P80} мкм")
print(f"Bond WI: {wi}")
print(f"Эрчим хүч: {energy_kwh_t:.2f} kWh/тонн")
```

### 2. Тээрмийн чадал (Mill Power)

Morrell-ийн томъёо:

```python
def mill_power_morrell(D, L, J, U, rho_s, phi_c, N, N_c):
    """
    Тээрмийн эрчим хүчний хэрэглээ
    
    Parameters:
    -----------
    D: Диаметр (м)
    L: Урт (м)
    J: Бөөмс дүүргэлт (%)
    U: Хоорондох зай дүүргэлт (%)
    rho_s: Бөөмсийн нягт (т/м³)
    phi_c: Критик хурд (%)
    N: Эргэлтийн хурд (rpm)
    N_c: Критик хурд (rpm)
    
    Returns:
    --------
    Чадал (kW)
    """
    
    # Критик хурд
    if N_c is None:
        N_c = 42.3 / np.sqrt(D)
    
    # Тээрмийн дотор хэсгийн эзлэхүүн
    V_mill = np.pi * (D**2) * L / 4
    
    # Бөөмсний эзлэхүүн
    V_ball = V_mill * J / 100
    
    # Бөөмсний масс
    M_ball = V_ball * rho_s
    
    # Чадал
    power = 10.6 * D**2.5 * L * (1 - 1.03*J/100) * (phi_c/100) * M_ball
    
    return power

# Жишээ: Том тээрэм
D = 5.5  # м
L = 8.5  # м
J = 35   # % бөөмс дүүргэлт
U = 30   # % материал дүүргэлт
rho_s = 7.8  # т/м³ (ган бөөмс)
N = 14   # rpm
N_c = 42.3 / np.sqrt(D)  # Критик хурд
phi_c = (N / N_c) * 100  # Критик хурдын %

power_kw = mill_power_morrell(D, L, J, U, rho_s, phi_c, N, N_c)
print(f"\\nТээрмийн чадал: {power_kw:,.0f} kW")
```

### 3. Бүтэн тооцоолол

```python
class BallMill:
    """Бөмбөлөгт тээрмийн загвар"""
    
    def __init__(self, D, L, N, J, U):
        """
        Parameters:
        -----------
        D: Диаметр (м)
        L: Урт (м)  
        N: Эргэлтийн хурд (rpm)
        J: Бөөмс дүүргэлт (%)
        U: Материал дүүргэлт (%)
        """
        self.D = D
        self.L = L
        self.N = N
        self.J = J
        self.U = U
        self.N_c = 42.3 / np.sqrt(D)
        self.phi_c = (N / self.N_c) * 100
        
    def volume(self):
        """Дотоод эзлэхүүн (м³)"""
        return np.pi * (self.D**2) * self.L / 4
    
    def ball_charge(self, rho_ball=7.8):
        """Бөөмсний жин (тонн)"""
        V_ball = self.volume() * self.J / 100
        return V_ball * rho_ball
    
    def material_charge(self, rho_ore=2.7):
        """Материалын жин (тонн)"""
        V_ore = self.volume() * self.U / 100
        return V_ore * rho_ore
    
    def power_draw(self, rho_ball=7.8):
        """Чадлын хэрэглээ (kW)"""
        M_ball = self.ball_charge(rho_ball)
        power = 10.6 * self.D**2.5 * self.L * (1 - 1.03*self.J/100) * \
                (self.phi_c/100) * M_ball
        return power
    
    def throughput(self, F80, P80, wi):
        """
        Боловсруулах хүчин чадал (т/цаг)
        
        Parameters:
        -----------
        F80: Тэжээл (мкм)
        P80: Гарц (мкм)
        wi: Bond Work Index
        """
        power_kw = self.power_draw()
        energy_kwh_t = calculate_grinding_energy(F80, P80, wi)
        throughput = power_kw / energy_kwh_t
        return throughput
    
    def summary(self, F80, P80, wi, operating_hours=8000):
        """Нэгтгэл мэдээлэл"""
        power = self.power_draw()
        throughput = self.throughput(F80, P80, wi)
        annual_tonnage = throughput * operating_hours
        annual_energy = power * operating_hours / 1000  # MWh
        
        report = f"""
{'='*60}
           ТЭЭРМИЙН ТООЦООЛЛЫН ҮР ДҮН
{'='*60}

ТЭЭРМИЙН ПАРАМЕТРҮҮД:
  Диаметр:              {self.D} м
  Урт:                  {self.L} м
  Эргэлтийн хурд:       {self.N} rpm
  Критик хурд:          {self.N_c:.1f} rpm ({self.phi_c:.1f}%)
  Бөөмс дүүргэлт:       {self.J}%
  Материал дүүргэлт:    {self.U}%

МАСС ТООЦООЛОЛ:
  Тээрмийн эзлэхүүн:    {self.volume():.1f} м³
  Бөөмсний жин:         {self.ball_charge():.1f} тонн
  Материалын жин:       {self.material_charge():.1f} тонн

ЭРЧИМ ХҮЧ & ХҮЧИН ЧАДАЛ:
  Чадал:                {power:,.0f} kW
  F80 → P80:            {F80} → {P80} мкм
  Bond WI:              {wi}
  Эрчим хүч (удельн):   {calculate_grinding_energy(F80, P80, wi):.2f} kWh/т
  Хүчин чадал:          {throughput:.1f} т/цаг

ЖИЛИЙН ТООЦООЛОЛ:
  Ажиллах цаг:          {operating_hours:,} цаг/жил
  Үйлдвэрлэл:           {annual_tonnage:,.0f} тонн/жил
  Эрчим хүчний хэрэглээ: {annual_energy:,.0f} MWh/жил

{'='*60}
"""
        return report

# Тээрэм үүсгэж, тооцоолох
mill = BallMill(
    D=5.5,    # 5.5м диаметр
    L=8.5,    # 8.5м урт
    N=14,     # 14 rpm
    J=35,     # 35% бөөмс
    U=30      # 30% материал
)

# Үр дүн харах
print(mill.summary(
    F80=1000,  # 1мм тэжээл
    P80=75,    # 75мкм гарц
    wi=13.13   # зэс
))
```

### 4. Параметрийн нөлөө

```python
# Өөр өөр параметрүүдийг харьцуулах
parameters = {
    'Бөөмс дүүргэлт (%)': np.arange(25, 46, 2),
    'Эргэлтийн хурд (rpm)': np.arange(12, 18, 0.5),
    'Диаметр (м)': np.arange(4.0, 7.0, 0.5)
}

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Бөөмс дүүргэлт
J_values = parameters['Бөөмс дүүргэлт (%)']
powers = [BallMill(5.5, 8.5, 14, J, 30).power_draw() for J in J_values]
axes[0].plot(J_values, powers, 'b-o', linewidth=2)
axes[0].set_xlabel('Бөөмс дүүргэлт (%)', fontsize=11)
axes[0].set_ylabel('Чадал (kW)', fontsize=11)
axes[0].set_title('Бөөмс дүүргэлтийн нөлөө', fontweight='bold')
axes[0].grid(True, alpha=0.3)

# Эргэлтийн хурд
N_values = parameters['Эргэлтийн хурд (rpm)']
powers = [BallMill(5.5, 8.5, N, 35, 30).power_draw() for N in N_values]
axes[1].plot(N_values, powers, 'g-o', linewidth=2)
axes[1].set_xlabel('Эргэлтийн хурд (rpm)', fontsize=11)
axes[1].set_ylabel('Чадал (kW)', fontsize=11)
axes[1].set_title('Эргэлтийн хурдны нөлөө', fontweight='bold')
axes[1].grid(True, alpha=0.3)

# Диаметр
D_values = parameters['Диаметр (м)']
powers = [BallMill(D, 8.5, 14, 35, 30).power_draw() for D in D_values]
axes[2].plot(D_values, powers, 'r-o', linewidth=2)
axes[2].set_xlabel('Диаметр (м)', fontsize=11)
axes[2].set_ylabel('Чадал (kW)', fontsize=11)
axes[2].set_title('Диаметрийн нөлөө', fontweight='bold')
axes[2].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('mill_parameter_effects.png', dpi=300, bbox_inches='tight')
plt.show()
```

## Практик зөвлөмж

### 1. Оновчтой ажиллагаа
- Критик хурдын 70-80%
- Бөөмс дүүргэлт 30-40%
- Тогтмол хяналт

### 2. Эрчим хүч хэмнэх
- Хоосон эргүүлэхгүй
- Оптимал нунтаглалт
- Тохиромжтой бөөмс

### 3. Хэмжилт
- Чадал хэмжигч суурилуулах
- Онлайн мониторинг
- Тогтмол шалгах

## Дүгнэлт

Тээрмийн эрчим хүч, хүчин чадлын тооцоололыг Python-оор хийх нь:
- Хурдан, үнэн зөв
- Олон хувилбар турших
- График харах
- Оновчтой ажиллуулах

Эрчим хүч баяжуулах үйлдвэрийн хамгийн том зардал. Зөв тооцоолж, оновчтой ажиллуулах нь эдийн засгийн үр дүнг ихээхэн сайжруулна.
