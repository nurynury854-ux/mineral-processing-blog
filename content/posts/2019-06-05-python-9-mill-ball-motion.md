---
title: "Баяжуулагч инженерүүдэд зориулсан Python №9"
date: "2019-06-05"
excerpt: "Matplotlib ашиглан тээрэм дэх ган бөөрөнцөгийн хөдөлгөөний динамикийг тээрмийн хүрдний эргэлтээс хамааруулан Python-оор загварчлав."
tags: ["Python", "Matplotlib", "Тээрэм", "Загварчлал"]
language: "mn"
views: 0
---

## Тээрмийн бөөрөнцөгийн хөдөлгөөн

Matplotlib ашиглан тээрэм дэх ган бөөрөнцөгийн хөдөлгөөний динамикийг тээрмийн хүрдний эргэлтээс хамааруулан Python-оор загварчлав.

### Тээрмийн параметрүүд

Тээрмийн хамгийн гадна давхрагын бөөрөнцөгийн хөдөлгөөний траектори, тасрах өнцөг, мөн унах байршлыг янз бүрийн эргэлтийн хурданд (75%, 80%, 87%) тооцож хөдөлгөөнт зургаар үзүүлэв.

### Python код

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# Тээрмийн параметрүүд
R = 1.0  # Радиус (м)
g = 9.81  # Таталцал (м/с²)

def ball_trajectory(rpm_percent):
    """Бөөрөнцөгийн траектори тооцоолох"""
    # Критик хурд
    rpm_critical = 42.3 / np.sqrt(2*R)
    rpm = rpm_critical * rpm_percent / 100
    
    # Өнцөг (радиан)
    theta = np.linspace(0, 2*np.pi, 100)
    
    # Координат
    x = R * np.cos(theta)
    y = R * np.sin(theta)
    
    # Тасрах өнцөг
    alpha_break = np.arccos(2/3 * (rpm/rpm_critical)**2)
    
    return x, y, np.degrees(alpha_break)

# График байгуулах
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
speeds = [75, 80, 87]

for ax, speed in zip(axes, speeds):
    x, y, break_angle = ball_trajectory(speed)
    
    ax.plot(x, y, 'b-', linewidth=2)
    ax.plot(0, 0, 'ro', markersize=10)
    ax.set_aspect('equal')
    ax.grid(True)
    ax.set_title(f'{speed}% Critical Speed\nBreak Angle: {break_angle:.1f}°')
    ax.set_xlabel('X (m)')
    ax.set_ylabel('Y (m)')

plt.tight_layout()
plt.show()
```

### Дүрслэл

Код нь тээрмийн 3 өөр хурданд бөөрөнцөгийн хөдөлгөөнийг харуулна:

1. **75% хурд** - Каскад хөдөлгөөн
2. **80% хурд** - Шилжилтийн хөдөлгөөн  
3. **87% хурд** - Центрифуг хөдөлгөөн

## Дүгнэлт

Python ба Matplotlib нь тээрмийн бөөрөнцөгийн хөдөлгөөнийг загварчлах, дүрслэхэд маш тохиромжтой хэрэгсэл юм.
