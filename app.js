var app = angular.module('excelApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'login.html',
        controller: 'LoginController'
    })
    .when('/products', {
        templateUrl: 'products.html',
        controller: 'ProductsController'
    })
    .when('/table', {
        templateUrl: 'table.html',
        controller: 'TableController'
    })
    .otherwise({
        redirectTo: '/'
    });
});

// Login controller
app.controller('LoginController', function($scope, $location) {
    $scope.username = '';
    $scope.password = '';
    $scope.loginError = false;

    $scope.login = function() {
        if ($scope.username === 'admin' && $scope.password === 'password') {
            $location.path('/products'); // Redirect to products page after successful login
        } else {
            $scope.loginError = true;
            $scope.loginErrorMessage = "Invalid username or password.";
        }
    };
});

// Products controller
app.controller('ProductsController', function($scope, $location) {
    $scope.products = [
        { name: 'Artev', image: 'artev.jpeg' },
        { name: 'CP', image: 'cp.jpeg' },
        { name: 'ID Baby', image: 'baby.jpeg' },
        { name: 'ID Touch', image: 'touch.jpeg' }
    ];

    $scope.viewProduct = function(product) {
        alert('Viewing ' + product.name);
    };

    $scope.viewAllProducts = function() {
        $location.path('/table'); // Navigate to table page on clicking "View All Products"
    };
});

// Table controller
app.controller('TableController', function($scope) {
    // Table functionality remains the same
    $scope.darkMode = false;
    $scope.headers = ["عدد كل كرتونة", "رصيد حالي", "هالك", "مرتجع", "منصرف", "وارد", "اسم", "كود"];
    $scope.tableData = [
        { "Column 1": "Data 1-1", "Column 2": "Data 1-2", "Column 3": "Data 1-3", "Column 4": "Data 1-4", "Column 5": "Data 1-5", "Column 6": "Data 1-6", "Column 7": "Data 1-7", "Column 8": "Data 1-8" },
        { "Column 1": "Data 2-1", "Column 2": "Data 2-2", "Column 3": "Data 2-3", "Column 4": "Data 2-4", "Column 5": "Data 2-5", "Column 6": "Data 2-6", "Column 7": "Data 2-7", "Column 8": "Data 2-8" }
    ];
    
    $scope.addRow = function() {
        var newRow = {};
        $scope.headers.forEach(header => newRow[header] = '');
        $scope.tableData.push(newRow);
    };

    $scope.deleteRow = function(index) {
        $scope.tableData.splice(index, 1);
    };

    $scope.updateCell = function(row, key, event) {
        row[key] = event.target.innerText;
    };

    $scope.saveData = function() {
        alert("Data saved successfully!");
    };

    $scope.customFilter = function(row) {
        if (!$scope.searchText) return true;
        return Object.values(row).some(val => val.toLowerCase().includes($scope.searchText.toLowerCase()));
    };
});
