---
title: "Python Problem #1 - Дээж авалтын төлөөллийн дээжний хамгийн бага жин"
date: "2025-11-15"
excerpt: "Дээж авалтын практикт ашигладаг Gy's sampling theory-г ашиглан төлөөллийн дээжний хамгийн бага жинг Python программаар тооцоолох нь."
tags: ["Python", "Sampling", "Mineral Processing", "Programming"]
language: "mixed"
views: 245
---

# Python Problem #1 - Sampling Representative Sample Minimum Weight

## Танилцуулга / Introduction

Дээж авалт нь баяжуулалтын практикт маш чухал үйл явц юм. Төлөөллийн дээж авснаар л үнэн зөв дүн шинжилгээ хийх боломжтой. Энэхүү програм нь Gy's sampling theory-г ашиглан төлөөллийн дээжний хамгийн бага жинг тооцоолдог.

Sampling is a crucial process in mineral processing practice. Only by taking representative samples can accurate analysis be performed. This program calculates the minimum weight of a representative sample using Gy's sampling theory.

## Томъёо / Formula

Gy-н дээж авалтын томъёо:

$$
M_s = \\frac{C \\cdot d^3}{(\\Delta g)^2}
$$

Where:
- $M_s$ = Minimum sample mass (g)
- $C$ = Sampling constant
- $d$ = Nominal top particle size (cm)
- $\\Delta g$ = Required accuracy (%)

## Python Code

```python
import math

def calculate_minimum_sample_weight(C, d, delta_g):
    """
    Calculate minimum sample weight using Gy's formula
    
    Parameters:
    -----------
    C : float
        Sampling constant
    d : float
        Nominal top particle size (cm)
    delta_g : float
        Required accuracy (%)
    
    Returns:
    --------
    float
        Minimum sample mass (g)
    """
    Ms = (C * (d ** 3)) / (delta_g ** 2)
    return Ms

def main():
    print("=== Дээж авалтын хамгийн бага жин тооцоолол ===")
    print("=== Minimum Sample Weight Calculator ===\\n")
    
    # Input parameters
    C = float(input("Sampling constant (C): "))
    d = float(input("Nominal top particle size d (cm): "))
    delta_g = float(input("Required accuracy Δg (%): "))
    
    # Calculate
    Ms = calculate_minimum_sample_weight(C, d, delta_g)
    
    # Output
    print(f"\\nMinimum sample weight: {Ms:.2f} g")
    print(f"Minimum sample weight: {Ms/1000:.2f} kg")

if __name__ == "__main__":
    main()
```

## Жишээ тооцоолол / Example Calculation

### Input:
- Sampling constant (C): 0.1
- Nominal top particle size (d): 2.5 cm
- Required accuracy (Δg): 1.0 %

### Output:
```
Minimum sample weight: 156.25 g
Minimum sample weight: 0.16 kg
```

## Дүгнэлт / Conclusion

Энэхүү Python програм нь дээж авалтын практикт өргөн хэрэглэгддэг Gy-н томъёог ашиглан төлөөллийн дээжний хамгийн бага жинг хялбархан тооцоолох боломжийг олгодог. 

Програмын давуу тал:
- Хялбар, ойлгомжтой код
- Хурдан тооцоолол
- Олон удаа ашиглах боломжтой

This Python program makes it easy to calculate the minimum weight of a representative sample using Gy's formula, which is widely used in sampling practice.

## Холбоос / References

1. Gy, P. (1979). Sampling of Particulate Materials: Theory and Practice
2. Pitard, F. F. (1993). Pierre Gy's Sampling Theory and Sampling Practice
