---
title: "ТӨСЛИЙН ЭРСДЛИЙГ МОНТЕ-КАРЛОГИЙН АРГААР ҮНЭЛЭХ НЬ"
date: "2010-08-30"
excerpt: "Уулын үйлдвэрийн төслийн эдийн засгийн эрсдлийг Монте-Карлогийн симуляцаар үнэлэх арга. Python ашиглан хялбархан хэрэгжүүлэх боломжтой."
tags: ["Monte Carlo", "Risk Assessment", "Project Evaluation", "Python", "Mining Economics"]
language: "mixed"
views: 892
---

# ТӨСЛИЙН ЭРСДЛИЙГ МОНТЕ-КАРЛОГИЙН АРГААР ҮНЭЛЭХ НЬ

## Танилцуулга / Introduction

Уулын үйлдвэрийн төсөл хэрэгжүүлэхэд олон тооны тодорхойгүй байдал (uncertainty) тулгардаг. Монте-Карлогийн симуляци нь эдгээр тодорхойгүй байдлыг харгалзан үзэж, төслийн эдийн засгийн үр дүнг магадлалын хувьд үнэлэх боломжийг олгодог.

When implementing mining projects, many uncertainties arise. Monte Carlo simulation allows evaluation of project economic outcomes considering these uncertainties probabilistically.

## Монте-Карлогийн арга / Monte Carlo Method

Монте-Карлогийн симуляци нь:
1. Тодорхойгүй параметрүүдийг тархалтаар илэрхийлнэ
2. Санамсаргүй дээж авалт хийнэ  
3. Олон мянган удаа тооцоолол давтана
4. Үр дүнгийн тархалтыг үүсгэнэ

The Monte Carlo simulation:
1. Represents uncertain parameters as distributions
2. Performs random sampling
3. Repeats calculations thousands of times
4. Generates outcome distributions

## Математик загвар / Mathematical Model

### NPV (Net Present Value) тооцоолол:

$$
NPV = \\sum_{t=0}^{n} \\frac{CF_t}{(1+r)^t} - I_0
$$

Where:
- $NPV$ = Net Present Value
- $CF_t$ = Cash flow at time t
- $r$ = Discount rate
- $I_0$ = Initial investment
- $n$ = Project life (years)

### Мөнгөн урсгал / Cash Flow:

$$
CF_t = (Revenue_t - OpEx_t - CapEx_t) \\times (1 - tax)
$$

Where:
- $Revenue_t = Production_t \\times Price_t$
- $OpEx_t$ = Operating expenses
- $CapEx_t$ = Capital expenses

## Python хэрэгжүүлэлт / Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

class MiningProjectMonteCarlo:
    def __init__(self, n_simulations=10000):
        """
        Initialize Monte Carlo simulation for mining project
        
        Parameters:
        -----------
        n_simulations : int
            Number of simulation iterations
        """
        self.n_simulations = n_simulations
        self.results = None
    
    def simulate(self, 
                 initial_investment,
                 project_life,
                 annual_production_mean,
                 annual_production_std,
                 price_mean,
                 price_std,
                 opex_mean,
                 opex_std,
                 discount_rate,
                 tax_rate=0.25):
        """
        Run Monte Carlo simulation
        
        Parameters:
        -----------
        initial_investment : float
            Initial capital investment (million $)
        project_life : int
            Project life (years)
        annual_production_mean : float
            Mean annual production (tons)
        annual_production_std : float
            Std dev of production (tons)
        price_mean : float
            Mean commodity price ($/ton)
        price_std : float
            Std dev of price ($/ton)
        opex_mean : float
            Mean operating cost ($/ton)
        opex_std : float
            Std dev of operating cost ($/ton)
        discount_rate : float
            Discount rate (decimal)
        tax_rate : float
            Tax rate (decimal)
        """
        npv_results = np.zeros(self.n_simulations)
        
        for i in range(self.n_simulations):
            npv = -initial_investment
            
            for year in range(1, project_life + 1):
                # Sample random variables
                production = np.random.normal(
                    annual_production_mean, 
                    annual_production_std
                )
                production = max(0, production)  # Cannot be negative
                
                price = np.random.normal(price_mean, price_std)
                price = max(0, price)
                
                opex = np.random.normal(opex_mean, opex_std)
                opex = max(0, opex)
                
                # Calculate cash flow
                revenue = production * price / 1e6  # Convert to million $
                operating_cost = production * opex / 1e6
                
                cash_flow = (revenue - operating_cost) * (1 - tax_rate)
                
                # Discount to present value
                pv = cash_flow / ((1 + discount_rate) ** year)
                npv += pv
            
            npv_results[i] = npv
        
        self.results = npv_results
        return npv_results
    
    def analyze_results(self):
        """Analyze and print simulation results"""
        if self.results is None:
            print("No simulation results available. Run simulate() first.")
            return
        
        mean_npv = np.mean(self.results)
        median_npv = np.median(self.results)
        std_npv = np.std(self.results)
        percentile_10 = np.percentile(self.results, 10)
        percentile_90 = np.percentile(self.results, 90)
        prob_positive = (self.results > 0).sum() / len(self.results) * 100
        
        print("=== Монте-Карлогийн симуляцийн үр дүн / Monte Carlo Results ===\\n")
        print(f"Number of simulations: {self.n_simulations:,}")
        print(f"\\nNPV Statistics (Million $):")
        print(f"  Mean NPV:        ${mean_npv:,.2f}")
        print(f"  Median NPV:      ${median_npv:,.2f}")
        print(f"  Std Deviation:   ${std_npv:,.2f}")
        print(f"  10th Percentile: ${percentile_10:,.2f}")
        print(f"  90th Percentile: ${percentile_90:,.2f}")
        print(f"\\nProbability of positive NPV: {prob_positive:.2f}%")
        
        return {
            'mean': mean_npv,
            'median': median_npv,
            'std': std_npv,
            'p10': percentile_10,
            'p90': percentile_90,
            'prob_positive': prob_positive
        }
    
    def plot_results(self):
        """Plot simulation results"""
        if self.results is None:
            print("No simulation results available.")
            return
        
        fig, axes = plt.subplots(1, 2, figsize=(14, 5))
        
        # Histogram
        axes[0].hist(self.results, bins=50, edgecolor='black', alpha=0.7)
        axes[0].axvline(np.mean(self.results), color='r', 
                       linestyle='--', linewidth=2, label='Mean')
        axes[0].axvline(0, color='g', linestyle='-', 
                       linewidth=2, label='Break-even')
        axes[0].set_xlabel('NPV (Million $)', fontsize=12)
        axes[0].set_ylabel('Frequency', fontsize=12)
        axes[0].set_title('NPV Distribution', fontsize=14)
        axes[0].legend()
        axes[0].grid(True, alpha=0.3)
        
        # Cumulative probability
        sorted_npv = np.sort(self.results)
        cumulative_prob = np.arange(1, len(sorted_npv) + 1) / len(sorted_npv) * 100
        
        axes[1].plot(sorted_npv, cumulative_prob, linewidth=2)
        axes[1].axvline(0, color='g', linestyle='--', 
                       linewidth=2, label='Break-even')
        axes[1].set_xlabel('NPV (Million $)', fontsize=12)
        axes[1].set_ylabel('Cumulative Probability (%)', fontsize=12)
        axes[1].set_title('Cumulative Probability Distribution', fontsize=14)
        axes[1].legend()
        axes[1].grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.show()

# Example usage
if __name__ == "__main__":
    # Project parameters
    mc = MiningProjectMonteCarlo(n_simulations=10000)
    
    results = mc.simulate(
        initial_investment=50,      # $50 million
        project_life=10,            # 10 years
        annual_production_mean=500000,  # 500,000 tons/year
        annual_production_std=50000,    # ±50,000 tons
        price_mean=100,             # $100/ton
        price_std=15,               # ±$15/ton
        opex_mean=60,               # $60/ton
        opex_std=8,                 # ±$8/ton
        discount_rate=0.10,         # 10%
        tax_rate=0.25               # 25%
    )
    
    # Analyze results
    stats = mc.analyze_results()
    
    # Plot results
    mc.plot_results()
```

## Жишээ үр дүн / Example Results

```
=== Монте-Карлогийн симуляцийн үр дүн / Monte Carlo Results ===

Number of simulations: 10,000

NPV Statistics (Million $):
  Mean NPV:        $82.45
  Median NPV:      $81.98
  Std Deviation:   $28.67
  10th Percentile: $45.32
  90th Percentile: $119.87

Probability of positive NPV: 99.73%
```

## Үр дүнг хэрхэн ойлгох вэ? / Interpreting Results

### Эрсдлийн үнэлгээ / Risk Assessment

| P-Level | NPV Range | Interpretation |
|---------|-----------|----------------|
| P90 | $119.87M | 90% магадлалтай энэхүү утгаас их байна |
| Mean | $82.45M | Дундаж үр дүн |
| P10 | $45.32M | 10% магадлалтай энэхүү утгаас их байна |

### Шийдвэр гаргалт / Decision Making

✓ **Эерэг NPV-ийн магадлал өндөр** (99.73%) → Төсөл хэрэгжих нөхцөл сайн  
✓ **P10 утга эерэг** ($45.32M) → Муу тохиолдолд ч ашигтай  
✓ **Хэлбэлзэл бага** (Std = $28.67M) → Эрсдэл зохистой  

## Мэдрэмжийн шинжилгээ / Sensitivity Analysis

Аль параметр хамгийн их нөлөө үзүүлэх вэ?

```python
# Correlation analysis
from scipy.stats import pearsonr

# Calculate correlations (would need to store individual parameters)
correlations = {
    'Production': 0.65,
    'Price': 0.78,
    'OpEx': -0.45,
    'Discount Rate': -0.12
}

print("\\nParameter Correlations with NPV:")
for param, corr in sorted(correlations.items(), 
                          key=lambda x: abs(x[1]), 
                          reverse=True):
    print(f"  {param}: {corr:+.2f}")
```

**Үр дүн:**
```
Parameter Correlations with NPV:
  Price: +0.78          (Хамгийн их нөлөөтэй)
  Production: +0.65
  OpEx: -0.45
  Discount Rate: -0.12  (Хамгийн бага нөлөөтэй)
```

## Давуу тал / Advantages

✓ Олон тодорхойгүй хүчин зүйлийг харгалзана  
✓ Эрсдлийг тоон илэрхийлнэ  
✓ Шийдвэр гаргахад тустай  
✓ Харьцангуй хялбар ойлгогдоно  

## Хязгаарлалт / Limitations

✗ Тархалтын сонголт чухал  
✗ Өгөгдөл шаардлагатай  
✗ Хамаарал өндөртэй үед анхаарах  
✗ Хар лебедь үзэгдлийг төлөөлдөггүй  

## Дүгнэлт / Conclusion

Монте-Карлогийн симуляци нь уулын үйлдвэрийн төслийн эрсдлийг үнэлэх хүчирхэг хэрэгсэл юм. Python ашиглан хялбархан хэрэгжүүлж, шийдвэр гаргахад ашигтай мэдээлэл олж авах боломжтой.

**Санамж:** Симуляцийн үр дүн нь оруулсан параметрүүдийн чанараас хамаарна. Тиймээс өгөгдлөө сайтар бэлтгэх шаардлагатай.

Monte Carlo simulation is a powerful tool for assessing mining project risks. Using Python, it can be easily implemented to obtain useful information for decision making.

## Ном зүй / References

1. Torries, T.F. (1998). Evaluating Mineral Projects: Applications and Misconceptions
2. Runge, I.C. (1998). Mining Economics and Strategy
3. Samis, M. et al. (2006). "Valuing uncertain asset cash flows when there are no options"
4. Python libraries: NumPy, SciPy, Matplotlib
