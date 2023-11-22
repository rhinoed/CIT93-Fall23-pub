// Footprint class

export class Footprint {
	constructor(
		firstName,
		lastName,
		household,
		homeSize,
		foodChoice,
		foodSource,
		ownBoth,
		runs,
		purchases
	) {
		this.user = `${firstName} ${lastName}`
		this.firstName = firstName
		this.lastName = lastName
		this.household = parseInt(household)
		this.homeSize = homeSize
		this.foodChoices = `${foodChoice}, ${foodSource}`
		this.ownBoth = ownBoth
		this.runs = runs
		this.purchasesPts = purchases
		this.setHouseholdPts()
		this.setHomeSizePts()
		this.setFoodChoicePts(foodChoice, foodSource)
		this.waterUseagePts = this.ownBoth ? this.runs * 2 : this.runs
		this.getTotal()
	}
	setHouseholdPts() {
		if (this.household === 1) {
			this.householdPts = 14
		} else if (this.household === 2) {
			this.householdPts = 12
		} else if (this.household === 3) {
			this.householdPts = 10
		} else if (this.household === 4) {
			this.householdPts = 8
		} else if (this.household === 5) {
			this.householdPts = 6
		} else if (this.household === 6) {
			this.householdPts = 4
		} else if (this.household > 6) {
			this.householdPts = 2
		} else {
			// only condition left is household is zero
			console.log("no update to points household is empty")
			this.householdPts = 0
		}
	}
	setHomeSizePts() {
		if (this.homeSize == "large") {
			this.homeSizePts = 10
		} else if (this.homeSize == "medium") {
			this.homeSizePts = 7
		} else if (this.homeSize == "small") {
			this.homeSizePts = 4
		} else if (this.homeSize == "apartment") {
			this.homeSizePts = 2
		} else {
			this.homeSizePts = 0
		}
	}
	getTotal() {
		this.total =
			this.householdPts +
			this.homeSizePts +
			this.foodChoicePts +
			this.waterUseagePts +
			this.purchasesPts
	}

	setFoodChoicePts(foodChoice, foodSource) {
		let total = 0
		switch (foodChoice) {
			case "carnivour":
				total += 10
				break
			case "omnivour":
				total += 8
				break
			case "vegitarian":
				total += 4
				break
			case "vegan":
				total += 2
				break
		}
		switch (foodSource) {
			case "prepackaged":
				total += 12
				break
			case "fresh":
				total += 6
				break
			case "wild":
				total += 2
				break
		}
		console.log(total)
		this.foodChoicePts = total
	}

	getHouseholdPurchasePts(runs) {
		// If you buy more than 7 new pieces of furniture, electronics, or other household gadgets per year, then add 10 points.
		// If you purchase between 5 and 7 items, then give yourself 8 points.
		// If you purchase between 3 and 5 items, then give yourself 6 points.
		// If you purchase less than 3 items, then give yourself 4 points.
		// If you purchase almost nothing or only secondhand items, then give yourself 2 points.
	}
}
