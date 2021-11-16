var myObject = new Vue({
  el: "#app",
  data: { message: "Hello Vue!" },
});

var roomType = "";
var priceOfHotel = 0;
var viewType = "";
var viewEffectPercent = "";
var discount = 0;

var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Ödemeyi Yap ve Bitir";
  } else {
    document.getElementById("nextBtn").innerHTML = "Kaydet ve Devam Et";
  }

  fixStepIndicator(n);

  if(n == 1) {
    var hotelNameChoice = document.getElementById("hotelSelectionItem").value;
    document.getElementById("hotelNameChoice").innerHTML = hotelNameChoice;
    var beginDate = document.getElementById("beginDate").value;
    document.getElementById("resBeginDate").innerHTML += beginDate;
    var endDate = document.getElementById("endDate").value;
    document.getElementById("resEndDate").innerHTML += endDate;
    var mySelect = document.getElementById("mySelect").value;
    document.getElementById("resAdultCount").innerHTML += mySelect;
    var childSelect = document.getElementById("childSelect").value;
    document.getElementById("resChildCount").innerHTML += childSelect;
  }

  if (n != 0) {
    document.getElementById("regForm").style.display = "none";
  }

  if (n == 2) FillReservationInfo(2);

  if (n == 3) {
    FillReservationInfo(3);

    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("hotelNameResult").innerHTML =
      document.getElementById("hotelSelectionItem").value;
  }
}

function FillReservationInfo(n) {
  debugger;

  var x = 0;

  if (n == 2) x = 0;
  else if (n == 3) x = 1;

  var beginDate = document.getElementById("beginDate").value;
  document.getElementsByClassName("item1")[x].innerHTML += beginDate;
  var endDate = document.getElementById("endDate").value;
  document.getElementsByClassName("item2")[x].innerHTML += endDate;
  var mySelect = document.getElementById("mySelect").value;
  document.getElementsByClassName("item3")[x].innerHTML += mySelect;
  var childSelect = document.getElementById("childSelect").value;
  document.getElementsByClassName("item4")[x].innerHTML += childSelect;
  document.getElementById("nextBtn").innerHTML = "Ödemeyi Yap ve Bitir";

  if (document.getElementById("roomTypeSelection1").checked) {
    roomType = document.getElementById("roomType1").innerHTML;
    document.getElementsByClassName("item5")[x].innerHTML += roomType;
    priceOfHotel = parseFloat(
      document.getElementById("priceOfHotel1").innerHTML
    );
  } else if (document.getElementById("roomTypeSelection2").checked) {
    roomType = document.getElementById("roomType2").innerHTML;
    document.getElementsByClassName("item5")[x].innerHTML += roomType;
    priceOfHotel = parseFloat(
      document.getElementById("priceOfHotel2").innerHTML
    );
  } else if (document.getElementById("roomTypeSelection3").checked) {
    roomType = document.getElementById("roomType3").innerHTML;
    document.getElementsByClassName("item5")[x].innerHTML += roomType;
    priceOfHotel = parseFloat(
      document.getElementById("priceOfHotel3").innerHTML
    );
  }

  if (document.getElementById("viewTypeSelection1").checked) {
    viewType = document.getElementById("viewType1").innerHTML;
    document.getElementsByClassName("item6")[x].innerHTML += viewType;
    viewEffectPercent = document.getElementById("viewEffectPercent1").innerHTML;
  } else if (document.getElementById("viewTypeSelection2").checked) {
    viewType = document.getElementById("viewType2").innerHTML;
    document.getElementsByClassName("item6")[x].innerHTML += viewType;
    viewEffectPercent = document.getElementById("viewEffectPercent2").innerHTML;
  } else if (document.getElementById("viewTypeSelection3").checked) {
    viewType = document.getElementById("viewType3").innerHTML;
    document.getElementsByClassName("item6")[x].innerHTML += viewType;
    viewEffectPercent = document.getElementById("viewEffectPercent3").innerHTML;
  }

  document.getElementsByClassName("dailyPrice")[x].innerHTML = priceOfHotel / 5;
  document.getElementsByClassName("priceOfEffectRate")[x].innerHTML =
    viewEffectPercent + "%";
  document.getElementsByClassName("accomodation")[x].innerHTML = priceOfHotel;
  document.getElementsByClassName("discount")[x].innerHTML = discount;

  var percent = parseInt(viewEffectPercent);
  var totalPrice =
    (priceOfHotel * 1000 + priceOfHotel * 1000 * (percent / 100) + discount) /
    1000;

  document.getElementsByClassName("totalPrice")[x].innerHTML =
    totalPrice.toFixed(3) + " TL";
}

var isCouponAdded = false;
var totalPrice = 0;
document.getElementById("codeBtn").onclick = function () {
  var couponCode = document.getElementById("couponCode").value;

  var percent = parseInt(viewEffectPercent);

  if (couponCode == "CODE100") {
    isCouponAdded = true;

    discount = -100;
    document.getElementsByClassName("discount")[0].innerHTML = discount;   

    totalPrice =
      (priceOfHotel * 1000 + priceOfHotel * 1000 * (percent / 100) + discount) /
      1000;

    document.getElementsByClassName("totalPrice")[0].innerHTML =
      totalPrice.toFixed(3) + " TL";
  } else {
    if (isCouponAdded) {
      totalPrice += 0.1;
    } else {
      debugger;
      discount = 0;
      totalPrice =
        (priceOfHotel * 1000 +
          priceOfHotel * 1000 * (percent / 100) +
          discount) /
        1000;
    }

    isCouponAdded = false;

    document.getElementsByClassName("totalPrice")[0].innerHTML =
      totalPrice.toFixed(3) + " TL";

    document.getElementsByClassName("discount")[0].innerHTML = "0";
  }
};

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n) {
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

function openReservationProcess() {
  document.getElementById("hotelSelectionItem").value = "";
  document.getElementById("beginDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("mySelect").value = "";
  document.getElementById("childSelect").value = "";

  document.getElementById("regForm").style.display = "block";

  var x = document.getElementsByClassName("tab");
  x[0].style.display = "block";
  x[x.length - 1].style.display = "none";

  var y = document.getElementsByClassName("step");
  y[0].className = "step active";

  for (i = 1; i < y.length; i++) {
    y[i].className = "step";
  }

  document.getElementById("prevBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "block";
  document.getElementById("nextBtn").innerHTML = "Kaydet ve Devam Et";
}

function deleteReservation() {
  var result = confirm(
    "Rezervasyon kaydınızı iptal etmek istediğinize emin misiniz?"
  );
  if (result) {
    alert("Rezervasyonunuz iptal edilmiştir");
  }
}
