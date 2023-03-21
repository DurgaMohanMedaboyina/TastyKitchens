Hi Welcome to TastyKitchens

Life Cycle (Brief):

User Logs => Search Favourite restaurant => Add Required Items => Go to Cart => Check the Items => Place Order

App Work Flow:

User Enters username and password. If correct, navigates to Home Route with the json Web Token stored in cookies. 

The moment home route is rendered, offer details and restaurant details are fetched making API call. While the API Call is in progress, Loader view is displayed. Once the api request is successful, data gets displayed.

Pagination/search & sort filter are available in the home page. We can select a restaurant and add the items by clicking on the add button available next to each item. The moment add button is clicked, 1 qty gets added by default. Increment/decrement can be done using Plus/Minus button.

Incase no item is added in cart, default view appears in cart component with a button "Order Now".

If items are available in cart, same would be displayed a list with item image, increment/decrement button on either side of the qty ordered, price of items. Total price would be displayed at the bottom with a button to "Place Order".If the button is clicked, page displays Order Placed Successfully.


Local Storage is used to add/modify/store the cart data.








