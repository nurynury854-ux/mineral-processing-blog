---
title: "Баяжуулагч инженерүүдэд зориулсан Python №14"
date: "2020-12-10"
excerpt: "Python for Mineral Processing Engineers - урсгалын өгөгдлийн шинжилгээ, масс баланс тооцоолол."
tags: ["Python", "Programming", "Mineral Processing"]
language: "mn"
views: 0
---

## Баяжуулалтын масс баланс Python дээр

Энэ хичээлд бид Python ашиглан баяжуулалтын процессын масс балансыг хэрхэн тооцоохыг үзнэ.

### NumPy ба Pandas ашиглах

```python
import numpy as np
import pandas as pd

# Урсгалын өгөгдөл
streams = {
    'Feed': {'Flow': 100, 'Grade': 2.5},
    'Concentrate': {'Flow': 25, 'Grade': 8.5},
    'Tailings': {'Flow': 75, 'Grade': 0.5}
}

# DataFrame үүсгэх
df = pd.DataFrame(streams).T
print(df)

# Металл тооцоолол
df['Metal'] = df['Flow'] * df['Grade'] / 100
print(f"\nMetal Recovery: {(df.loc['Concentrate', 'Metal'] / df.loc['Feed', 'Metal'] * 100):.2f}%")
```

### Масс балансын шалгалт

```python
def check_mass_balance(feed_flow, conc_flow, tail_flow, tolerance=0.01):
    """Масс балансын алдааг шалгах"""
    balance = abs(feed_flow - (conc_flow + tail_flow))
    if balance <= tolerance:
        return True, f"Balance OK: {balance:.3f}"
    else:
        return False, f"Balance Error: {balance:.3f}"

# Тест
result, message = check_mass_balance(100, 25, 75)
print(message)
```

### График байгуулах

```python
import matplotlib.pyplot as plt

# Гарц ба металл авалтын хамаарал
yields = np.arange(10, 50, 5)
recoveries = yields * 0.8 + np.random.normal(0, 2, len(yields))

plt.figure(figsize=(10, 6))
plt.plot(yields, recoveries, 'bo-', label='Recovery')
plt.xlabel('Yield (%)')
plt.ylabel('Metal Recovery (%)')
plt.title('Yield vs Recovery')
plt.grid(True)
plt.legend()
plt.show()
```

## Дүгнэлт

Python нь баяжуулалтын тооцоололд маш хүчирхэг хэрэгсэл. NumPy, Pandas, Matplotlib зэрэг сангууд нь өгөгдөл боловсруулалт, дүрслэлд тустай.
