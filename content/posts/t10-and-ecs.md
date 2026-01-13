---
title: "t10 ба Ecs -ийн тухай"
date: "2010-11-29"
excerpt: "Нунтаглалтын процессын гол параметр болох t10 болон Ecs-ийн талаар. JK Drop Weight Test-ээс гаргаж авсан үр дүнг хэрхэн ашиглах вэ?"
tags: ["Comminution", "t10", "Ecs", "JK Test", "Breaking Characterization"]
language: "mixed"
views: 567
---

# t10 ба Ecs -ийн тухай

## Танилцуулга / Introduction

Уул уурхайн салбарт ажилладаг инженерүүд материалын хугарлын шинж чанарыг тодорхойлоход **t10** болон **Ecs** параметрүүдийг өргөн ашигладаг. Эдгээр параметрүүд нь JK Drop Weight Test-ийн үр дүнгээс гаргаж авдаг.

In the mining industry, engineers widely use **t10** and **Ecs** parameters to characterize material breakage properties. These parameters are derived from JK Drop Weight Test results.

## t10 гэж юу вэ? / What is t10?

**t10** нь хугарлын функцийн гол параметр бөгөөд **10% mesh size-аар дамжсан материалын хувь** гэж тодорхойлогддог.

Математик илэрхийлэл:

$$
t_{10} = A(1 - e^{-bE_{cs}})
$$

Where:
- $t_{10}$ = Percentage passing 1/10th of initial particle size
- $A$ = Maximum t10 value (material-dependent parameter)
- $b$ = Breakage rate parameter
- $E_{cs}$ = Specific comminution energy (kWh/t)

### t10-ийн утга / t10 Values

| Material Type | Typical A value | b value |
|--------------|-----------------|---------|
| Soft ore | 80-100 | 0.5-0.8 |
| Medium ore | 60-80 | 0.3-0.5 |
| Hard ore | 40-60 | 0.2-0.4 |
| Very hard ore | 20-40 | 0.1-0.3 |

## Ecs гэж юу вэ? / What is Ecs?

**Ecs (Specific Comminution Energy)** нь материалыг хугалахад шаардагдах хувийн эрчим хүч юм. Энэ нь **кВт·цаг/тонн** (kWh/t) хэмжээсээр илэрхийлэгддэг.

$$
E_{cs} = \\frac{Energy \\ Input}{Mass \\ of \\ Material}
$$

### Ecs-ийн тооцоолол / Ecs Calculation

JK Drop Weight Test-д:

$$
E_{cs} = \\frac{m \\cdot g \\cdot h}{M}
$$

Where:
- $m$ = Mass of drop weight (kg)
- $g$ = Gravitational acceleration (9.81 m/s²)
- $h$ = Drop height (m)
- $M$ = Mass of test sample (kg)

## Практик жишээ / Practical Example

### Өгөгдөл / Given Data

- Drop weight mass: 20 kg
- Drop height: 1.5 m
- Sample mass: 3 kg
- Resulting t10: 25%

### Тооцоолол / Calculation

```python
# Calculate Ecs
m = 20  # kg
g = 9.81  # m/s²
h = 1.5  # m
M = 3  # kg

Ecs = (m * g * h) / M
print(f"Ecs = {Ecs:.2f} kWh/t")

# Convert to kWh/t
Ecs_kWh = Ecs / 3600  # J to kWh
print(f"Ecs = {Ecs_kWh:.4f} kWh/t")
```

**Result:**
```
Ecs = 98.10 J/kg
Ecs = 0.0273 kWh/t
```

## t10-Ecs хамаарал / t10-Ecs Relationship

t10 болон Ecs-ийн хамаарлыг графикаар дүрсэлбэл:

```python
import numpy as np
import matplotlib.pyplot as plt

# Parameters
A = 75  # Maximum t10
b = 0.4  # Breakage rate

# Calculate t10 for range of Ecs
Ecs = np.linspace(0, 10, 100)
t10 = A * (1 - np.exp(-b * Ecs))

# Plot
plt.figure(figsize=(10, 6))
plt.plot(Ecs, t10, 'b-', linewidth=2, label=f'A={A}, b={b}')
plt.xlabel('Ecs (kWh/t)', fontsize=12)
plt.ylabel('t10 (%)', fontsize=12)
plt.title('t10 vs Ecs Relationship', fontsize=14)
plt.grid(True, alpha=0.3)
plt.legend(fontsize=11)
plt.show()
```

## SAG/AG тээрэмд хэрэглэх нь / Application in SAG/AG Mills

t10 болон Ecs параметрүүд нь SAG Mill-ийн чадлыг тооцоолоход чухал үүрэг гүйцэтгэдэг:

### SAG Mill Power Model

$$
P = K \\cdot D^{2.5} \\cdot L \\cdot (1 - 1.03J) \\cdot \\rho_b \\cdot C_s
$$

Where:
- $P$ = Mill power (kW)
- $D$ = Mill diameter (m)
- $L$ = Mill effective length (m)
- $J$ = Ball charge (% of mill volume)
- $\\rho_b$ = Density of mill contents
- $C_s$ = Speed factor

## Материал хоорондын харьцуулалт / Material Comparison

| Ore Type | A | b | Характеристик |
|----------|---|---|---------------|
| Copper ore A | 68 | 0.45 | Medium-hard |
| Iron ore B | 52 | 0.32 | Hard |
| Gold ore C | 75 | 0.51 | Medium-soft |
| Coal | 85 | 0.65 | Soft |

## Дүгнэлт / Conclusion

**t10** болон **Ecs** параметрүүд нь:

✓ Материалын хугарлын шинж чанарыг тодорхойлно  
✓ Тээрмийн зохион байгуулалтад ашиглагдана  
✓ Эрчим хүчний зарцуулалтыг тооцоолоход шаардлагатай  
✓ Олон улсад стандарт болгон хэрэглэгддэг  

Эдгээр параметрүүдийг зөв ашиглаж чадвал баяжуулалтын үйлдвэрийн үр ашгийг мэдэгдэхүйц сайжруулах боломжтой.

These parameters are essential for:
- Material characterization
- Mill design
- Energy consumption calculations
- International standard practice

Proper use of these parameters can significantly improve processing plant efficiency.

## Ном зүй / References

1. Napier-Munn, T.J. et al. (1996). Mineral Comminution Circuits: Their Operation and Optimisation
2. Morrell, S. (2004). An alternative energy-size relationship to that proposed by Bond
3. JKTech Laboratory Services - Drop Weight Test procedures
4. SME Mineral Processing Handbook (2002)
