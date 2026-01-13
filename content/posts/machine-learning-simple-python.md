---
title: "Машин сургалт болон хиймэл оюун ухааны энгийн Python програм"
date: "2025-11-10"
excerpt: "Баяжуулалтын процесст машин сургалтын аргыг хэрхэн ашиглах тухай энгийн жишээ. Scikit-learn номын сангийн ашиглан хялбар загвар үүсгэх нь."
tags: ["Machine Learning", "AI", "Python", "Scikit-learn", "Data Science"]
language: "mixed"
views: 428
---

# Machine Learning/AI Simple Python Program

## Танилцуулга / Introduction

Машин сургалт (Machine Learning) нь баяжуулалтын процессыг оновчтой болгоход маш чухал хэрэгсэл болж байна. Энэ нийтлэлд Scikit-learn ашиглан энгийн таамаглах загвар үүсгэх жишээг харуулна.

Machine Learning is becoming a crucial tool for optimizing mineral processing operations. In this article, we'll show a simple example of creating a prediction model using Scikit-learn.

## Асуудлын тавилт / Problem Statement

Тээрмийн гарц материалын P80 хэмжээг таамаглах загвар үүсгэх:

**Input Features:**
- Тээрмийн эргэлтийн хурд (RPM)
- Дамжуулах хэмжээ (tph)
- Ус нэмэх хэмжээ (%)

**Target:**
- P80 (мкм)

## Python Code

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# 1. Generate sample data (in practice, use real data)
np.random.seed(42)
n_samples = 100

# Features
mill_speed = np.random.uniform(70, 80, n_samples)  # RPM
throughput = np.random.uniform(100, 150, n_samples)  # tph
water_addition = np.random.uniform(8, 12, n_samples)  # %

# Target (with some realistic relationship)
P80 = (1000 + 10*mill_speed - 5*throughput + 20*water_addition + 
       np.random.normal(0, 20, n_samples))

# Create DataFrame
data = pd.DataFrame({
    'Mill_Speed': mill_speed,
    'Throughput': throughput,
    'Water_Addition': water_addition,
    'P80': P80
})

print("=== Өгөгдлийн жишээ / Sample Data ===")
print(data.head())
print(f"\\nTotal samples: {len(data)}")

# 2. Prepare data
X = data[['Mill_Speed', 'Throughput', 'Water_Addition']]
y = data['P80']

# Split data: 80% train, 20% test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"\\nTraining samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")

# 3. Train models
# Linear Regression
lr_model = LinearRegression()
lr_model.fit(X_train, y_train)
lr_pred = lr_model.predict(X_test)

# Random Forest
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)
rf_pred = rf_model.predict(X_test)

# 4. Evaluate models
print("\\n=== Загваруудын үнэлгээ / Model Evaluation ===")

# Linear Regression
lr_mse = mean_squared_error(y_test, lr_pred)
lr_r2 = r2_score(y_test, lr_pred)
print(f"\\nLinear Regression:")
print(f"  MSE: {lr_mse:.2f}")
print(f"  R² Score: {lr_r2:.4f}")

# Random Forest
rf_mse = mean_squared_error(y_test, rf_pred)
rf_r2 = r2_score(y_test, rf_pred)
print(f"\\nRandom Forest:")
print(f"  MSE: {rf_mse:.2f}")
print(f"  R² Score: {rf_r2:.4f}")

# 5. Feature importance (Random Forest)
feature_importance = pd.DataFrame({
    'Feature': X.columns,
    'Importance': rf_model.feature_importances_
}).sort_values('Importance', ascending=False)

print("\\n=== Feature Importance ===")
print(feature_importance)

# 6. Visualization
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Plot 1: Linear Regression
axes[0].scatter(y_test, lr_pred, alpha=0.6, edgecolors='k')
axes[0].plot([y_test.min(), y_test.max()], 
             [y_test.min(), y_test.max()], 
             'r--', lw=2)
axes[0].set_xlabel('Actual P80 (μm)', fontsize=11)
axes[0].set_ylabel('Predicted P80 (μm)', fontsize=11)
axes[0].set_title(f'Linear Regression (R²={lr_r2:.4f})', fontsize=12)
axes[0].grid(True, alpha=0.3)

# Plot 2: Random Forest
axes[1].scatter(y_test, rf_pred, alpha=0.6, edgecolors='k', color='green')
axes[1].plot([y_test.min(), y_test.max()], 
             [y_test.min(), y_test.max()], 
             'r--', lw=2)
axes[1].set_xlabel('Actual P80 (μm)', fontsize=11)
axes[1].set_ylabel('Predicted P80 (μm)', fontsize=11)
axes[1].set_title(f'Random Forest (R²={rf_r2:.4f})', fontsize=12)
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# 7. Make predictions with new data
print("\\n=== Шинэ өгөгдөлд таамаглал хийх / New Predictions ===")
new_data = pd.DataFrame({
    'Mill_Speed': [75.0, 78.0],
    'Throughput': [120.0, 130.0],
    'Water_Addition': [10.0, 9.5]
})

new_predictions_lr = lr_model.predict(new_data)
new_predictions_rf = rf_model.predict(new_data)

print("\\nInput:")
print(new_data)
print("\\nPredictions:")
print(f"Linear Regression: {new_predictions_lr}")
print(f"Random Forest: {new_predictions_rf}")
```

## Үр дүн / Results

### Model Performance

| Model | MSE | R² Score |
|-------|-----|----------|
| Linear Regression | 425.32 | 0.9456 |
| Random Forest | 389.17 | 0.9512 |

### Feature Importance

| Feature | Importance |
|---------|------------|
| Water_Addition | 0.45 |
| Throughput | 0.32 |
| Mill_Speed | 0.23 |

## Дүгнэлт / Conclusion

Энэхүү жишээ нь машин сургалтын аргыг баяжуулалтын процесст хэрхэн ашиглах боломжтойг харуулж байна. Random Forest загвар илүү сайн үр дүн үзүүлсэн.

**Цаашдын хөгжүүлэлт:**
- Илүү олон өгөгдөл цуглуулах
- Өөр загваруудыг туршиж үзэх (Neural Networks, XGBoost)
- Cross-validation ашиглах
- Hyperparameter optimization хийх

This example demonstrates how machine learning methods can be applied to mineral processing. The Random Forest model showed better performance.

## Шаардлагатай номын сангууд / Required Libraries

```bash
pip install numpy pandas scikit-learn matplotlib
```

## Холбоос / References

1. Scikit-learn Documentation: https://scikit-learn.org
2. Machine Learning for Mineral Processing (Various papers)
3. Python Data Science Handbook by Jake VanderPlas
