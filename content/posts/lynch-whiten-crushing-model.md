---
title: "Lynch-Whiten Crushing Model"
date: "2025-11-20"
excerpt: "Lynch-Whiten нунтаглалтын загвар нь нунтаглах тоног төхөөрөмжийн гүйцэтгэлийг загварчлахад өргөн хэрэглэгддэг. Энэ нийтлэлд загварын үндэс, тооцоолол, Python код зэргийг танилцуулна."
tags: ["Crushing", "Lynch-Whiten Model", "Comminution", "Python", "Process Modeling"]
language: "mixed"
views: 312
---

# Lynch-Whiten Crushing Model

## Ерөнхий мэдээлэл / Overview

Lynch-Whiten загвар нь нунтаглах тоног төхөөрөмжийн гүйцэтгэлийг математик загвараар тодорхойлдог. Энэ загвар нь орц болон гарцын ширхэгийн хэмжээний тархалтыг холбож, төхөөрөмжийн үр ашгийг үнэлэх боломжийг олгодог.

The Lynch-Whiten model is a mathematical representation of crusher performance. This model relates the feed and product size distributions and allows evaluation of equipment efficiency.

## Загварын тэгшитгэл / Model Equation

Lynch-Whiten загварын үндсэн тэгшитгэл:

$$
P(x) = C(x) \\cdot F(x) + [1 - C(x)] \\cdot b(x)
$$

Where:
- $P(x)$ = Product cumulative size distribution
- $F(x)$ = Feed cumulative size distribution  
- $C(x)$ = Classification function
- $b(x)$ = Breakage function

### Classification Function

$$
C(x) = \\frac{1}{1 + (x/d_{50c})^m}
$$

Parameters:
- $d_{50c}$ = Cut size (50% passing size)
- $m$ = Sharpness of classification

### Breakage Function

$$
b(x) = \\phi + (1-\\phi) \\cdot (\\frac{x}{x_{max}})^\\gamma
$$

Parameters:
- $\\phi$ = Proportion of fines produced
- $\\gamma$ = Distribution parameter
- $x_{max}$ = Maximum particle size

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

class LynchWhitenModel:
    def __init__(self, d50c, m, phi, gamma):
        """
        Initialize Lynch-Whiten crushing model
        
        Parameters:
        -----------
        d50c : float
            Cut size (mm)
        m : float
            Classification sharpness
        phi : float
            Proportion of fines
        gamma : float
            Distribution parameter
        """
        self.d50c = d50c
        self.m = m
        self.phi = phi
        self.gamma = gamma
    
    def classification_function(self, x):
        """Calculate classification function C(x)"""
        return 1 / (1 + (x / self.d50c) ** self.m)
    
    def breakage_function(self, x, x_max):
        """Calculate breakage function b(x)"""
        return self.phi + (1 - self.phi) * (x / x_max) ** self.gamma
    
    def predict_product(self, feed_sizes, feed_dist, x_max):
        """
        Predict product size distribution
        
        Parameters:
        -----------
        feed_sizes : array
            Feed particle sizes (mm)
        feed_dist : array
            Feed cumulative distribution
        x_max : float
            Maximum particle size (mm)
            
        Returns:
        --------
        array
            Product cumulative distribution
        """
        C = self.classification_function(feed_sizes)
        b = self.breakage_function(feed_sizes, x_max)
        
        product = C * feed_dist + (1 - C) * b
        return product

# Example usage
if __name__ == "__main__":
    # Model parameters
    model = LynchWhitenModel(
        d50c=10.0,  # mm
        m=2.5,
        phi=0.2,
        gamma=1.5
    )
    
    # Feed data
    sizes = np.array([0.1, 0.5, 1.0, 2.0, 5.0, 10.0, 20.0, 50.0])
    feed_dist = np.array([5, 15, 25, 40, 60, 75, 90, 100])
    
    # Predict product
    product_dist = model.predict_product(sizes, feed_dist, x_max=50.0)
    
    # Plot results
    plt.figure(figsize=(10, 6))
    plt.semilogx(sizes, feed_dist, 'b-o', label='Feed', linewidth=2)
    plt.semilogx(sizes, product_dist, 'r-s', label='Product', linewidth=2)
    plt.xlabel('Particle Size (mm)', fontsize=12)
    plt.ylabel('Cumulative Passing (%)', fontsize=12)
    plt.title('Lynch-Whiten Model - Feed vs Product', fontsize=14)
    plt.grid(True, which='both', alpha=0.3)
    plt.legend(fontsize=11)
    plt.tight_layout()
    plt.show()
    
    # Print results
    print("\\n=== Lynch-Whiten Model Results ===")
    print("\\nSize (mm) | Feed (%) | Product (%)")
    print("-" * 40)
    for i, size in enumerate(sizes):
        print(f"{size:8.1f} | {feed_dist[i]:8.1f} | {product_dist[i]:8.1f}")
```

## Загварын параметрүүд / Model Parameters

### d50c (Cut Size)
- Нунтаглагчийн ангилах хэмжээ
- Ихэвчлэн орц материалын хэмжээнээс хамаарна
- Typical range: 5-50 mm

### m (Sharpness)
- Ангилалтын хурц байдал
- Өндөр утга = илүү хурц ангилалт
- Typical range: 1.5-3.5

### φ (Phi)
- Нарийн ширхэгийн үүсэх хувь
- Материалын хатуу байдлаас хамаарна
- Typical range: 0.1-0.3

### γ (Gamma)
- Хуваарилалтын параметр
- Хугарлын шинж чанарыг тодорхойлно
- Typical range: 0.5-2.0

## Хэрэглээ / Applications

1. **Нунтаглалтын схем зохиох**
   - Circuit design and optimization
   
2. **Тоног төхөөрөмжийн сонголт**
   - Equipment selection and sizing
   
3. **Процессын удирдлага**
   - Process control and monitoring
   
4. **Гүйцэтгэлийн үнэлгээ**
   - Performance evaluation

## Давуу болон сул тал / Advantages and Limitations

### Давуу тал / Advantages
✓ Математик загвар  
✓ Параметрүүд физик утга бүхий  
✓ Программчлалд хялбар  
✓ Өргөн хүрээнд туршигдсан  

### Сул тал / Limitations
✗ Туршилтын өгөгдөл шаардлагатай  
✗ Материал бүрт калибрчлах хэрэгтэй  
✗ Эвдрэлийн механизм өөрчлөгдвөл буруу үр дүн гарч болно  

## Дүгнэлт / Conclusion

Lynch-Whiten загвар нь нунтаглалтын процессыг загварчлахад хамгийн өргөн хэрэглэгддэг аргуудын нэг юм. Python ашиглан энэ загварыг хялбархан хэрэгжүүлж, янз бүрийн нөхцөлд туршиж үзэх боломжтой.

The Lynch-Whiten model is one of the most widely used methods for modeling crushing processes. Using Python, this model can be easily implemented and tested under various conditions.

## Ном зүй / References

1. Lynch, A.J. (1977). Mineral Crushing and Grinding Circuits
2. Whiten, W.J. (1972). The simulation of crushing plants
3. Napier-Munn, T.J. et al. (1996). Mineral Comminution Circuits
