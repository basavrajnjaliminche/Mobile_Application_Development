const Order = require("./Order");
const large = 2;
const small = 1;

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SIZE_1: Symbol("size"),
  TOPPINGS_1: Symbol("toppings"),
  SECOND_ITEM: Symbol("second_item"),
  SIZE_2: Symbol("size2"),
  TOPPINGS_2: Symbol("toppings2"),
  THIRD_ITEM: Symbol("third_item"),
  SIZE_3: Symbol("size3"),
  TOPPINGS_3: Symbol("toppings3"),
  UP_SELL_2: Symbol("Ice_cream"),
  DRINKS: Symbol("drinks"),
  PAYMENT: Symbol("payment")
});

module.exports = class ShwarmaOrder extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sToppings = "";
    this.sDrinks = "";
    this.sItem1 = "shawarama";
    this.sItem2 = "Biryani";
    this.sItem2 = "Burrito";
    this.sSize2 = "";
    this.sToppings2 = "";
    this.sSize3 = "";
    this.sToppings3 = "";
    this.sUpSell2 = "";
    this.cost = 0;
    this.cost1 = 0;
    this.cost2 = 0;
    this.cost3 = 0;
    this.cost4 = 0;
    this.cost5 = 0;

  }

  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.SIZE_1;
        this.cost1 = 1;
        aReturn.push("Welcome to Basavraj's Shawarma.");
        aReturn.push("What size Shawarma would you like?");
        break;
      case OrderState.SIZE_1:
        

        if ((sInput.toLowerCase() != "large") && (sInput.toLowerCase() != "small")) {
          aReturn.push("Please select large or small")
        } else {
          if (sInput.toLowerCase() !== "large") {
            this.cost1 = this.cost1 + large;
          } else {
            this.cost1 = this.cost1 + small;
          }
          this.stateCur = OrderState.TOPPINGS_1
          this.sSize = sInput;
          aReturn.push("What toppings would you like?");
        }

        break;

      case OrderState.TOPPINGS_1:
        this.stateCur = OrderState.SECOND_ITEM
        this.sToppings = sInput;
        aReturn.push("Would you like to have biryani?");
        break;
      case OrderState.SECOND_ITEM:

        if (sInput.toLowerCase() != "no") {
          this.sItem2 = "biryani";
          this.stateCur = OrderState.SIZE_2;
          this.cost2 = 2;
          aReturn.push("What biryani size would you like?");
          break;
        }
        this.stateCur = OrderState.THIRD_ITEM
        aReturn.push("Would you like to have a burrito?");
        break;
      case OrderState.SIZE_2:
        if ((sInput.toLowerCase() != "large") && (sInput.toLowerCase() != "small")) {
          aReturn.push("Please select large or small")
        } else {
          if (sInput.toLowerCase() !== "large") {
            this.cost2 = this.cost2 + large;
          } else {
            this.cost2 = this.cost2 + small;
          }
          this.stateCur = OrderState.TOPPINGS_2
          this.sSize = sInput;
          aReturn.push("What toppings would you like?");
        }
        break;
      case OrderState.TOPPINGS_2:

        this.stateCur = OrderState.THIRD_ITEM
        this.sToppings2 = sInput;
        aReturn.push("Would you like to have a burrito?");
        break;
      case OrderState.THIRD_ITEM:
        if (sInput.toLowerCase() != "no") {
          this.sItem3 = "burrito";
          this.stateCur = OrderState.SIZE_3;
          this.cost3 = 3;
          aReturn.push("What size of burrito do you like?");

        }
        this.stateCur = OrderState.UP_SELL_2
        aReturn.push("Would you like to have  Icecream with that?");
        break;
      case OrderState.SIZE_3:
        if ((sInput.toLowerCase() != "large") && (sInput.toLowerCase() != "small")) {
          aReturn.push("Please select large or small")
        } else {
          if (sInput.toLowerCase() !== "large") {
            this.cost3 = this.cost3 + large;
          } else {
            this.cost3 = this.cost3 + small;
          }
          this.stateCur = OrderState.TOPPINGS_3
          this.sSize = sInput;
          aReturn.push("Which type of burrito do you like to have ?");
        }
        break;

      case OrderState.TOPPINGS_3:
        this.stateCur = OrderState.UP_SELL_2
        this.sToppings3 = sInput;
        aReturn.push("Would you like Icecream with that?");
        break;
      case OrderState.UP_SELL_2:
        this.stateCur = OrderState.DRINKS
        if (sInput.toLowerCase() != "no") {
          this.sUpSell2 = "Icecream";
          this.cost4 = 4;
        }
        aReturn.push("Would you like drinks with that?");
        break;

      case OrderState.DRINKS:
        this.stateCur = OrderState.PAYMENT;

        if (sInput.toLowerCase() != "no") {
          this.sDrinks = sInput;
          this.cost5 = 5;
          this.sDrinks = "Coke";
        }
        aReturn.push("Thank-you for your order of ");
        aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
        if (this.sItem2) {
          aReturn.push(`${this.sSize2} ${this.sItem2} with ${this.sToppings2}`);
        }
        if (this.sItem3) {
          aReturn.push(`${this.sSize3} ${this.sItem3} of type ${this.sToppings3} `);
        }
        if (this.sUpSell2) {
          aReturn.push(this.sUpSell2);
        }
        if (this.sDrinks) {
          aReturn.push(this.sDrinks);
        }

        this.cost = ((this.cost1 + this.cost2 + this.cost3 + this.cost4 + this.cost5) * 1.13).toFixed(2);
        console.log(this.cost);
        aReturn.push(`your estimated cost is ${this.cost}`)

        aReturn.push(`Please pay for your order here`);
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        break;
      case OrderState.PAYMENT:
        console.log(sInput);
        this.isDone(true);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Your order will be delivered at
                ${sInput.purchase_units[0].shipping.address.address_line_1}
                ${sInput.purchase_units[0].shipping.address.admin_area_2}
                ${sInput.purchase_units[0].shipping.address.admin_area_1}
                ${sInput.purchase_units[0].shipping.address.postal_code}
                ${sInput.purchase_units[0].shipping.address.country_code}
                 ${d.toTimeString()}`);

        break;
    }
    return aReturn;
  }
  renderForm(sTitle = "-1", sAmount = "-1") {
    // your client id should be kept private
    if (sTitle != "-1") {
      this.sItem = sTitle;
    }
    if (sAmount != "-1") {
      this.cost = sAmount;
    }
    const sClientID = process.env.SB_CLIENT_ID || 'put your client id here for testing ... Make sure that you delete it before committing'
    return (`
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
        Thank you ${this.sNumber} for your ${this.sItem} order of $${this.cost}.
        <div id="paypal-button-container"></div>
  
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.cost}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    window.open("", "_self");
                    window.close(); 
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `);

  }
}