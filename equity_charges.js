 
var states = ["Arunachal Pradesh", "Assam", "Delhi", "Goa, Daman & Diu", "Gujarat", "Haryana",
            "Himachal Pradesh", "Jammu & Kashmir", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
            "Meghalaya", "Odisha", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Others"];
        
        var sel = document.getElementById('state_intra');
        var fragment = document.createDocumentFragment();

        states.forEach(function (states, index) {
            var opt = document.createElement('option');
            opt.innerHTML = states;
            opt.value = states;
            fragment.appendChild(opt);
        });

        sel.appendChild(fragment);

/*
var equity = ["Delivery Equity","Future Equity","Option Equity"];
        
        var type = document.getElementById('equity');
        var fragment2 = document.createDocumentFragment();

        equity.forEach(function (equity, index) {
            var opt2 = document.createElement('option');
            opt2.innerHTML = equity;
            opt2.value = equity;
            fragment2.appendChild(opt2);
        });

        type.appendChild(fragment2);
*/

    /*  ------------ CHANGE ON INPUT ----------- */  
        
        /* -- onChange="intra();" -- */

function equity() {
  var equity = $("#equity").val();
  if (equity == "Intraday Equity") {intra()};
  if (equity == "Interday Equity") {inter()};
  if (equity == "Future Equity") {future()};
  if (equity == "Option Equity") {option()};
}

function intra() {
            var intra_buy = $("#intra_buy").val();
            var intra_sell = $("#intra_sell").val();
            var intra_qty = $("#intra_qty").val();
            var intra_nbse = $("input[name=nbse1]:checked").val();
            var intra_state = $('.intra_state option:selected').eq(0).val();
            var turnover = (parseInt(intra_buy)+parseInt(intra_sell))*intra_qty;
            var intra_brokerage = Math.min(turnover*0.0001,40);
            var intra_stt = parseInt(intra_sell)*intra_qty*0.00025;
            var intra_ntc = turnover*0.0000325;
            var intra_btc = turnover*0.0000275;
            var intra_nserv = 0.15*(intra_brokerage+intra_ntc);
            var intra_bserv = 0.15*(intra_brokerage+intra_btc);
            var intra_sebi = 0.000002*turnover;
            
            var stamp_duty;
            if(intra_state == "Andhra Pradesh") {stamp_duty = Math.min(0.00005*turnover,50)};
            if(intra_state == "Arunachal Pradesh") {stamp_duty = Math.min(0.0004*turnover,40)};
            if(intra_state == "Assam") {stamp_duty = Math.min(0.00018*turnover,49.5)};
            if(intra_state == "Delhi") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Goa, Daman & Diu") {stamp_duty = Math.min(0.0001*turnover,50)};
            if(intra_state == "Gujarat") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Haryana") {stamp_duty = Math.min(0.00003*turnover,30)};
            if(intra_state == "Himachal Pradesh") {stamp_duty = 50};
            if(intra_state == "Jammu & Kashmir") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Karnataka") {stamp_duty = Math.min(0.0001*turnover,50)};
            if(intra_state == "Kerala") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Madhya Pradesh") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Maharashtra") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Meghalaya") {stamp_duty = Math.min(0.0004*turnover,40)};
            if(intra_state == "Odisha") {stamp_duty = Math.min(0.00005*turnover,50)};
            if(intra_state == "Rajasthan") {stamp_duty = 0.000025*turnover};
            if(intra_state == "Tamil Nadu") {stamp_duty = 0.00006*turnover};
            if(intra_state == "Telangana") {stamp_duty = Math.min(0.0001*turnover,100)};
            if(intra_state == "Uttar Pradesh") {stamp_duty = Math.min(0.00002*turnover,1000)};
            if(intra_state == "West Bengal") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Others") {stamp_duty = Math.min(0.0001*turnover,50)};
            
            var total_nchar = intra_brokerage + intra_stt + intra_ntc + intra_nserv + intra_sebi + 13.5 + stamp_duty;
            var total_bchar = intra_brokerage + intra_stt + intra_btc + intra_bserv + intra_sebi + 13.5 + stamp_duty;
            var intra_nbreak = total_nchar/intra_qty;
            var intra_bbreak = total_bchar/intra_qty;

            if (intra_nbse == "NSE") {$("#intra_break").empty().append(intra_nbreak.toFixed(2));}
            else {$("#intra_tc").empty().append(intra_bbreak.toFixed(2));}
            
            $("#intra_to").empty().append(turnover.toLocaleString());
            $("#intra_brokerage").empty().append(intra_brokerage.toFixed(2));
            $("#intra_stt").empty().append(intra_stt.toFixed(2));
            if (intra_nbse == "NSE") {$("#intra_tc").empty().append(intra_ntc.toFixed(2));}
            else {$("#intra_tc").empty().append(intra_btc.toFixed(2));}
            if (intra_nbse == "NSE") {$("#intra_serv").empty().append(intra_nserv.toFixed(2));}
            else {$("#intra_serv").empty().append(intra_bserv.toFixed(2));}
            $("#intra_sebi").empty().append(intra_sebi.toFixed(2));

            if (intra_nbse == "NSE") {$("#intra_char").empty().append(total_nchar.toFixed());}
            else {$("#intra_char").empty().append(total_bchar.toFixed());}
            $("#intra_stamp").empty().append(stamp_duty.toFixed(2));
            
            var pandl;
            if (intra_nbse == "NSE") {pandl = (((parseInt(intra_sell)-parseInt(intra_buy))*parseInt(intra_qty))-total_nchar).toFixed()}
            else {pandl = (((parseInt(intra_sell)-parseInt(intra_buy))*parseInt(intra_qty))-total_bchar).toFixed()}

            if (pandl > 0) {$("#pltext").empty().append('<div style="color:green;" id="pltext">Net Profit</div>');
                            $("#plnum").empty().append('<div style="color:green;" id="plnum">' + pandl + '</div>')}
            if (pandl < 0) {$("#pltext").empty().append('<div style="color:red;" id="pltext">Net Loss</div>');
                            $("#plnum").empty().append('<div style="color:red;" id="plnum">' + pandl + '</div>')}
            if (pandl === 0) {$("#pltext").empty().append('<div id="pltext">Net Amount</div>');
                            $("#plnum").empty().append('<div id="plnum">' + pandl + '</div>')}
            
            var intra_char;
            if (intra_nbse == "NSE") {intra_char = total_nchar}
            else {intra_char = total_bchar}

            $("#dp_char").empty().append(0);
            $("#statement").empty().append("You're being charged <span style='font-family:Arial;'>&#8377;</span>" + intra_char.toFixed() + " on <span style='font-family:Arial;'>&#8377;</span>" + turnover.toLocaleString() + " amount of transaction");
            console.log("Intra working perfect");
     }

      /*  ------------ Completed calculation and appending ------------ */

function inter() {
            var intra_buy = $("#intra_buy").val();
            var intra_sell = $("#intra_sell").val();
            var intra_qty = $("#intra_qty").val();
            var intra_nbse = $("input[name=nbse1]:checked").val();
            var intra_state = $('.intra_state option:selected').eq(0).val();
            var turnover = (parseInt(intra_buy)+parseInt(intra_sell))*intra_qty;
            var intra_brokerage = 0;
            var intra_stt = turnover*0.001;
            var intra_ntc = turnover*0.0000325;
            var intra_btc = turnover*0.0000275;
            var intra_nserv = 0.15*(intra_brokerage+intra_ntc);
            var intra_bserv = 0.15*(intra_brokerage+intra_btc);
            var intra_sebi = 0.000002*turnover;
            
            var stamp_duty;
            if(intra_state == "Andhra Pradesh") {stamp_duty = Math.min(0.00005*turnover,50)};
            if(intra_state == "Arunachal Pradesh") {stamp_duty = Math.min(0.0004*turnover,40)};
            if(intra_state == "Assam") {stamp_duty = Math.min(0.00018*turnover,49.5)};
            if(intra_state == "Delhi") {stamp_duty = 0.0001*turnover};
            if(intra_state == "Goa, Daman & Diu") {stamp_duty = Math.min(0.0001*turnover,50)};
            if(intra_state == "Gujarat") {stamp_duty = 	0.0001*turnover};
            if(intra_state == "Haryana") {stamp_duty = Math.min(0.00003*turnover,30)};
            if(intra_state == "Himachal Pradesh") {stamp_duty = 50};
            if(intra_state == "Jammu & Kashmir") {stamp_duty = 	0.0001*turnover};
            if(intra_state == "Karnataka") {stamp_duty = Math.min(0.0001*turnover,50)};
            if(intra_state == "Kerala") {stamp_duty = 	0.0001*turnover};
            if(intra_state == "Madhya Pradesh") {stamp_duty = 	0.0001*turnover};
            if(intra_state == "Maharashtra") {stamp_duty = 	0.0001*turnover};
            if(intra_state == "Meghalaya") {stamp_duty = Math.min(0.0004*turnover,40)};
            if(intra_state == "Odisha") {stamp_duty = Math.min(0.00005*turnover,50)};
            if(intra_state == "Rajasthan") {stamp_duty = 0.000025*turnover};
            if(intra_state == "Tamil Nadu") {stamp_duty = 0.00006*turnover};
            if(intra_state == "Telangana") {stamp_duty = Math.min(0.0001*turnover,100)};
            if(intra_state == "Uttar Pradesh") {stamp_duty = Math.min(0.00002*turnover,1000)};
            if(intra_state == "West Bengal") {stamp_duty = 	0.0001*turnover};
            if(intra_state == "Others") {stamp_duty = Math.min(0.0001*turnover,50)};
            
            var total_nchar = intra_brokerage + intra_stt + intra_ntc + intra_nserv + intra_sebi + 13.5 + stamp_duty;
            var total_bchar = intra_brokerage + intra_stt + intra_btc + intra_bserv + intra_sebi + 13.5 + stamp_duty;
            var intra_nbreak = total_nchar/intra_qty;
            var intra_bbreak = total_bchar/intra_qty;

            if (intra_nbse == "NSE") {$("#intra_break").empty().append(intra_nbreak.toFixed(2));}
            else {$("#intra_tc").empty().append(intra_bbreak.toFixed(2));}
            
            $("#intra_to").empty().append(turnover.toLocaleString());
            $("#intra_brokerage").empty().append(intra_brokerage.toFixed(2));
            $("#intra_stt").empty().append(intra_stt.toFixed(2));
            if (intra_nbse == "NSE") {$("#intra_tc").empty().append(intra_ntc.toFixed(2));}
            else {$("#intra_tc").empty().append(intra_btc.toFixed(2));}
            if (intra_nbse == "NSE") {$("#intra_serv").empty().append(intra_nserv.toFixed(2));}
            else {$("#intra_serv").empty().append(intra_bserv.toFixed(2));}
            $("#intra_sebi").empty().append(intra_sebi.toFixed(2));

            if (intra_nbse == "NSE") {$("#intra_char").empty().append(total_nchar.toFixed());}
            else {$("#intra_char").empty().append(total_bchar.toFixed());}
            $("#intra_stamp").empty().append(stamp_duty.toFixed(2));
            
            var pandl;
            if (intra_nbse == "NSE") {pandl = (((parseInt(intra_sell)-parseInt(intra_buy))*parseInt(intra_qty))-total_nchar).toFixed()}
            else {pandl = (((parseInt(intra_sell)-parseInt(intra_buy))*parseInt(intra_qty))-total_bchar).toFixed()}

            if (pandl > 0) {$("#pltext").empty().append('<div style="color:green;" id="pltext">Net Profit</div>');
                            $("#plnum").empty().append('<div style="color:green;" id="plnum">' + pandl + '</div>')}
            if (pandl < 0) {$("#pltext").empty().append('<div style="color:red;" id="pltext">Net Loss</div>');
                            $("#plnum").empty().append('<div style="color:red;" id="plnum">' + pandl + '</div>')}
            if (pandl === 0) {$("#pltext").empty().append('<div id="pltext">Net Amount</div>');
                            $("#plnum").empty().append('<div id="plnum">' + pandl + '</div>')}
            
            var intra_char;
            if (intra_nbse == "NSE") {intra_char = total_nchar}
            else {intra_char = total_bchar}

            $("#dp_char").empty().append(13.50);
            $("#statement").empty().append("You're being charged <span style='font-family:Arial;'>&#8377;</span>" + intra_char.toFixed() + " on <span style='font-family:Arial;'>&#8377;</span>" + turnover.toLocaleString() + " amount of transaction");
            console.log("Inter working perfect");
    }

     //////////////////////////////

function future() {
            var intra_buy = $("#intra_buy").val();
            var intra_sell = $("#intra_sell").val();
            var intra_qty = $("#intra_qty").val();
            var intra_nbse = $("input[name=nbse1]:checked").val();
            var intra_state = $('.intra_state option:selected').eq(0).val();
            var turnover = (parseInt(intra_buy)+parseInt(intra_sell))*intra_qty;
            var intra_brokerage = Math.min(turnover*0.0001,40);
            var intra_stt = parseInt(intra_sell)*intra_qty*0.0001;
            var intra_ntc = turnover*0.000021;
            var intra_btc = turnover*0.000007;
            var intra_nserv = 0.15*(intra_brokerage+intra_ntc);
            var intra_bserv = 0.15*(intra_brokerage+intra_btc);
            var intra_sebi = 0.000002*turnover;
            
            var stamp_duty;
            if(intra_state == "Andhra Pradesh") {stamp_duty = Math.min(0.00005*turnover,50)};
            if(intra_state == "Arunachal Pradesh") {stamp_duty = Math.min(0.0004*turnover,40)};
            if(intra_state == "Assam") {stamp_duty = Math.min(0.00018*turnover,49.5)};
            if(intra_state == "Delhi") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Goa, Daman & Diu") {stamp_duty = Math.min(0.0001*turnover,50)};
            if(intra_state == "Gujarat") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Haryana") {stamp_duty = Math.min(0.00003*turnover,30)};
            if(intra_state == "Himachal Pradesh") {stamp_duty = 50};
            if(intra_state == "Jammu & Kashmir") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Karnataka") {stamp_duty = Math.min(0.0001*turnover,50)};
            if(intra_state == "Kerala") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Madhya Pradesh") {stamp_duty = Math.min(0.00002*turnover,50)};
            if(intra_state == "Maharashtra") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Meghalaya") {stamp_duty = Math.min(0.0004*turnover,40)};
            if(intra_state == "Odisha") {stamp_duty = Math.min(0.00005*turnover,50)};
            if(intra_state == "Rajasthan") {stamp_duty = 0.00001*turnover};
            if(intra_state == "Tamil Nadu") {stamp_duty = 0.00006*turnover};
            if(intra_state == "Telangana") {stamp_duty = Math.min(0.0001*turnover,100)};
            if(intra_state == "Uttar Pradesh") {stamp_duty = Math.min(0.00002*turnover,1000)};
            if(intra_state == "West Bengal") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Others") {stamp_duty = Math.min(0.0001*turnover,50)};
            
            var total_nchar = intra_brokerage + intra_stt + intra_ntc + intra_nserv + intra_sebi + 13.5 + stamp_duty;
            var total_bchar = intra_brokerage + intra_stt + intra_btc + intra_bserv + intra_sebi + 13.5 + stamp_duty;
            var intra_nbreak = total_nchar/intra_qty;
            var intra_bbreak = total_bchar/intra_qty;

            if (intra_nbse == "NSE") {$("#intra_break").empty().append(intra_nbreak.toFixed(2));}
            else {$("#intra_tc").empty().append(intra_bbreak.toFixed(2));}
            
            $("#intra_to").empty().append(turnover.toLocaleString());
            $("#intra_brokerage").empty().append(intra_brokerage.toFixed(2));
            $("#intra_stt").empty().append(intra_stt.toFixed(2));
            if (intra_nbse == "NSE") {$("#intra_tc").empty().append(intra_ntc.toFixed(2));}
            else {$("#intra_tc").empty().append(intra_btc.toFixed(2));}
            if (intra_nbse == "NSE") {$("#intra_serv").empty().append(intra_nserv.toFixed(2));}
            else {$("#intra_serv").empty().append(intra_bserv.toFixed(2));}
            $("#intra_sebi").empty().append(intra_sebi.toFixed(2));

            if (intra_nbse == "NSE") {$("#intra_char").empty().append(total_nchar.toFixed());}
            else {$("#intra_char").empty().append(total_bchar.toFixed());}
            $("#intra_stamp").empty().append(stamp_duty.toFixed(2));
            
            var pandl;
            if (intra_nbse == "NSE") {pandl = (((parseInt(intra_sell)-parseInt(intra_buy))*parseInt(intra_qty))-total_nchar).toFixed()}
            else {pandl = (((parseInt(intra_sell)-parseInt(intra_buy))*parseInt(intra_qty))-total_bchar).toFixed()}

            if (pandl > 0) {$("#pltext").empty().append('<div style="color:green;" id="pltext">Net Profit</div>');
                            $("#plnum").empty().append('<div style="color:green;" id="plnum">' + pandl + '</div>')}
            if (pandl < 0) {$("#pltext").empty().append('<div style="color:red;" id="pltext">Net Loss</div>');
                            $("#plnum").empty().append('<div style="color:red;" id="plnum">' + pandl + '</div>')}
            if (pandl === 0) {$("#pltext").empty().append('<div id="pltext">Net Amount</div>');
                            $("#plnum").empty().append('<div id="plnum">' + pandl + '</div>')}
            
            var intra_char;
            if (intra_nbse == "NSE") {intra_char = total_nchar}
            else {intra_char = total_bchar}

            $("#dp_char").empty().append(0.00);
            $("#statement").empty().append("You're being charged <span style='font-family:Arial;'>&#8377;</span>" + intra_char.toFixed() + " on <span style='font-family:Arial;'>&#8377;</span>" + turnover.toLocaleString() + " amount of transaction");
            console.log("Future working perfect");
     }


function option() {
            var intra_buy = $("#intra_buy").val();
            var intra_sell = $("#intra_sell").val();
            var intra_qty = $("#intra_qty").val();
            var intra_nbse = $("input[name=nbse1]:checked").val();
            var intra_state = $('.intra_state option:selected').eq(0).val();
            var turnover = (parseInt(intra_buy)+parseInt(intra_sell))*intra_qty;
            var intra_brokerage = 20;
            var intra_stt = parseInt(intra_sell)*intra_qty*0.0001;
            var intra_ntc = turnover*0.00053;
            var intra_btc = turnover*0.00027;
            var intra_nserv = 0.15*(intra_brokerage+intra_ntc);
            var intra_bserv = 0.15*(intra_brokerage+intra_btc);
            var intra_sebi = 0.000002*turnover;
            
            var stamp_duty;
            if(intra_state == "Andhra Pradesh") {stamp_duty = Math.min(0.00005*turnover,50)};
            if(intra_state == "Arunachal Pradesh") {stamp_duty = Math.min(0.0004*turnover,40)};
            if(intra_state == "Assam") {stamp_duty = Math.min(0.00018*turnover,49.5)};
            if(intra_state == "Delhi") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Goa, Daman & Diu") {stamp_duty = Math.min(0.0001*turnover,50)};
            if(intra_state == "Gujarat") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Haryana") {stamp_duty = Math.min(0.00003*turnover,30)};
            if(intra_state == "Himachal Pradesh") {stamp_duty = 50};
            if(intra_state == "Jammu & Kashmir") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Karnataka") {stamp_duty = Math.min(0.0001*turnover,50)};
            if(intra_state == "Kerala") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Madhya Pradesh") {stamp_duty = Math.min(0.00002*turnover,50)};
            if(intra_state == "Maharashtra") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Meghalaya") {stamp_duty = Math.min(0.0004*turnover,40)};
            if(intra_state == "Odisha") {stamp_duty = Math.min(0.00005*turnover,50)};
            if(intra_state == "Rajasthan") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Tamil Nadu") {stamp_duty = 0.00006*turnover};
            if(intra_state == "Telangana") {stamp_duty = Math.min(0.0001*turnover,100)};
            if(intra_state == "Uttar Pradesh") {stamp_duty = Math.min(0.00002*turnover,1000)};
            if(intra_state == "West Bengal") {stamp_duty = 0.00002*turnover};
            if(intra_state == "Others") {stamp_duty = Math.min(0.0001*turnover,50)};
            
            var total_nchar = intra_brokerage + intra_stt + intra_ntc + intra_nserv + intra_sebi + 13.5 + stamp_duty;
            var total_bchar = intra_brokerage + intra_stt + intra_btc + intra_bserv + intra_sebi + 13.5 + stamp_duty;
            var intra_nbreak = total_nchar/intra_qty;
            var intra_bbreak = total_bchar/intra_qty;

            if (intra_nbse == "NSE") {$("#intra_break").empty().append(intra_nbreak.toFixed(2));}
            else {$("#intra_tc").empty().append(intra_bbreak.toFixed(2));}
            
            $("#intra_to").empty().append(turnover.toLocaleString());
            $("#intra_brokerage").empty().append(intra_brokerage.toFixed(2));
            $("#intra_stt").empty().append(intra_stt.toFixed(2));
            if (intra_nbse == "NSE") {$("#intra_tc").empty().append(intra_ntc.toFixed(2));}
            else {$("#intra_tc").empty().append(intra_btc.toFixed(2));}
            if (intra_nbse == "NSE") {$("#intra_serv").empty().append(intra_nserv.toFixed(2));}
            else {$("#intra_serv").empty().append(intra_bserv.toFixed(2));}
            $("#intra_sebi").empty().append(intra_sebi.toFixed(2));

            if (intra_nbse == "NSE") {$("#intra_char").empty().append(total_nchar.toFixed());}
            else {$("#intra_char").empty().append(total_bchar.toFixed());}
            $("#intra_stamp").empty().append(stamp_duty.toFixed(2));
            
            var pandl;
            if (intra_nbse == "NSE") {pandl = (((parseInt(intra_sell)-parseInt(intra_buy))*parseInt(intra_qty))-total_nchar).toFixed()}
            else {pandl = (((parseInt(intra_sell)-parseInt(intra_buy))*parseInt(intra_qty))-total_bchar).toFixed()}

            if (pandl > 0) {$("#pltext").empty().append('<div style="color:green;" id="pltext">Net Profit</div>');
                            $("#plnum").empty().append('<div style="color:green;" id="plnum">' + pandl + '</div>')}
            if (pandl < 0) {$("#pltext").empty().append('<div style="color:red;" id="pltext">Net Loss</div>');
                            $("#plnum").empty().append('<div style="color:red;" id="plnum">' + pandl + '</div>')}
            if (pandl === 0) {$("#pltext").empty().append('<div id="pltext">Net Amount</div>');
                            $("#plnum").empty().append('<div id="plnum">' + pandl + '</div>')}
            
            var intra_char;
            if (intra_nbse == "NSE") {intra_char = total_nchar}
            else {intra_char = total_bchar}

            $("#dp_char").empty().append(0.00);
            $("#statement").empty().append("You're being charged <span style='font-family:Arial;'>&#8377;</span>" + intra_char.toFixed() + " on <span style='font-family:Arial;'>&#8377;</span>" + turnover.toLocaleString() + " amount of transaction");
            console.log("Option working perfect");
     }