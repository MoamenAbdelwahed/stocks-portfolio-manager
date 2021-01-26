<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md12
      >
        <material-card
          color="general"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="stocksNumber"
                    class="purple-input"
                    label="Stocks Number"
                    @keyup="calculate"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="buyPrice"
                    class="purple-input"
                    label="Buy price"
                    @keyup="calculateTotalBuy"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="sellPrice"
                    class="purple-input"
                    label="Sell price"
                    @keyup="calculateTotalSell"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  Total buy price: <span v-text="totalBuyPrice"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  Total sell price: <span v-text="totalSellPrice"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  Total profit: <span v-text="totalProfit"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  Profit percentage: %<span v-text="profitPercentage"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    stocksNumber: 0,
    buyPrice: 0,
    sellPrice: 0,
    totalBuyPrice: 0,
    totalSellPrice: 0,
    totalProfit: 0,
    profitPercentage: 0
  }),
  methods: {
    calculate: function () {
      this.calculateTotalBuy()
      this.calculateTotalSell()
    },
    calculateTotalBuy: function () {
      const initialBuyPrice = parseFloat(this.buyPrice) * parseFloat(this.stocksNumber)
      if (initialBuyPrice > 0) {
        this.totalBuyPrice = initialBuyPrice + this.calculateBrokerCommission(initialBuyPrice) +
                this.calculateCentralSavingCommission(initialBuyPrice) +
                this.calculateMarketCommission(initialBuyPrice) +
                this.calculateRiskCommission(initialBuyPrice) +
                this.calculateMarketService(initialBuyPrice) +
                this.calculateAnotherService(initialBuyPrice) +
                this.calculateTax(initialBuyPrice)
        this.totalBuyPrice = this.totalBuyPrice.toFixed(2)
        this.calculateTotalProfit()
      } else {
        this.totalBuyPrice = 0
      }
    },
    calculateTotalSell: function () {
      const initialSellPrice = parseFloat(this.sellPrice) * parseFloat(this.stocksNumber)
      if (initialSellPrice > 0) {
        this.totalSellPrice = initialSellPrice - this.calculateBrokerCommission(initialSellPrice) -
                this.calculateCentralSavingCommission(initialSellPrice) -
                this.calculateMarketCommission(initialSellPrice) -
                this.calculateRiskCommission(initialSellPrice) -
                this.calculateMarketService(initialSellPrice) -
                this.calculateAnotherService(initialSellPrice) -
                this.calculateTax(initialSellPrice)
        this.totalSellPrice = this.totalSellPrice.toFixed(2)
        this.calculateTotalProfit()
      } else {
        this.totalSellPrice = 0
      }
    },
    calculateBrokerCommission: function (price) {
      const commission = (0.15 * price) / 100
      return (commission > 5) ? this.toFixedTwoDigits(commission) : 5
    },
    calculateCentralSavingCommission: function (price) {
      const commission = (0.05 * price) / 100
      return (commission > 3) ? this.toFixedTwoDigits(commission) : 3
    },
    calculateMarketCommission: function (price) {
      return this.toFixedTwoDigits((0.01 * price) / 100)
    },
    calculateRiskCommission: function (price) {
      return this.toFixedTwoDigits((0.005 * price) / 100)
    },
    calculateMarketService: function (price) {
      const commission = (0.005 * price) / 100
      return (commission > 1) ? this.toFixedTwoDigits(commission) : 1
    },
    calculateAnotherService: function (price) {
      return this.toFixedTwoDigits((0.01 * price) / 100)
    },
    calculateTax: function (price) {
      return this.toFixedTwoDigits((0.05 * price) / 100)
    },
    calculateTotalProfit: function () {
      this.totalProfit = (this.totalSellPrice - this.totalBuyPrice).toFixed(2)
      this.calculateProfitPercentage()
    },
    calculateProfitPercentage: function () {
      this.profitPercentage = ((this.totalProfit / this.totalBuyPrice) * 100).toFixed(2)
    },
    toFixedTwoDigits: function (price) {
      let s = String(price)
      if (price % 1)s = s.replace(/5$/, '6')
      return parseFloat((+s).toFixed(2))
    }
  }
}
</script>
