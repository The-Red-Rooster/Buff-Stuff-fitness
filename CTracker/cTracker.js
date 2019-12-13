// Item Controller
const foodEntryFunct = (function () {
    // Item Constructor
    const Food = function (val, name, calories) {
        this.val = val;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const foodStruct = {
        foodArr: [],
        currentItem: null,
        totalCals: 0
    }

    // Public methods
    return {
        getFood: function () {
            return foodStruct.foodArr;
        },
        addFood: function (name, calories) {
            let ID;
            // Create ID
            if (foodStruct.foodArr.length > 0) {
                ID = foodStruct.foodArr[foodStruct.foodArr.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new item
            newFood = new Food(ID, name, calories);

            // Add to items array
            foodStruct.foodArr.push(newFood);

            return newFood;
        },
        getTotalCalories: function () {
            let total = 0;

            // Loop through items and add cals
            foodStruct.foodArr.forEach(function (item) {
                total += item.calories;
            });

            // Set total cal in data structure
            foodStruct.totalCals = total;

            // Return total
            return foodStruct.totalCals;
        },
        logData: function () {
            return foodStruct;
        }
    }
})();

// UI Controller -------------------------------------------
const interfaceFunct = (function () {
    const interfaceElements = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    // Public methods
    return {
        populateItemList: function (items) {
            let html = '';

            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.val}">
                <strong><h6>${item.name}:</h6> </strong> <em> ${item.calories} Calories</em>`
            });

            // Insert list items
            document.querySelector(interfaceElements.itemList).innerHTML = html;
        },
        getItemInput: function () {
            return {
                name: document.querySelector(interfaceElements.itemNameInput).value,
                calories: document.querySelector(interfaceElements.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            // Show the list
            document.querySelector(interfaceElements.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.val}`;
            // Add HTML
            li.innerHTML = `<strong><h6>${item.name}:</h6> </strong> <em>${item.calories} Calories</em>`;
            // Insert item
            document.querySelector(interfaceElements.itemList).insertAdjacentElement('beforeend', li)
        },
        clearInput: function () {
            document.querySelector(interfaceElements.itemNameInput).value = '';
            document.querySelector(interfaceElements.itemCaloriesInput).value = '';
        },
        hideList: function () {
            document.querySelector(interfaceElements.itemList).style.display = 'none';
        },
        showTotalCalories: function (totalCalories) {
            document.querySelector(interfaceElements.totalCalories).textContent = totalCalories;
        },
        getSelectors: function () {
            return interfaceElements;
        }
    }
})();

// App Controller
const App = (function (foodEntryFunct, interfaceFunct) {
    // Load event listeners
    const loadEventListeners = function () {
        const UISelectors = interfaceFunct.getSelectors();
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    // Add item submit
    const itemAddSubmit = function (e) {
        // Get form input from UI Controller
        const input = interfaceFunct.getItemInput();

        // Check for name and calorie input
        if (input.name !== '' && input.calories !== '') {
            // Add item
            const newItem = foodEntryFunct.addFood(input.name, input.calories);

            // Add item to UI list
            interfaceFunct.addListItem(newItem);

            // Get total calories
            const totalCalories = foodEntryFunct.getTotalCalories();
            // Add total calories to UI
            interfaceFunct.showTotalCalories(totalCalories);

            // Clear fields
            interfaceFunct.clearInput();
        }

        e.preventDefault();
    }

    // Public methods
    return {
        init: function () {
            // Fetch items from data structure
            const items = foodEntryFunct.getFood();

            // Check if any items
            if (items.length === 0) {
                interfaceFunct.hideList();
            } else {
                // Populate list with items
                interfaceFunct.populateItemList(items);
            }

            // Get total calories
            const totalCalories = foodEntryFunct.getTotalCalories();
            // Add total calories to UI
            interfaceFunct.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();
        }
    }

})(foodEntryFunct, interfaceFunct);

// Initialize App
App.init();
