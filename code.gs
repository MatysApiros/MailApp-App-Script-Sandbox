var sheet   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails").activate();
var lastRow = sheet.getLastRow();
var template     = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getRange(1,1).getValue();
var quotaLeft = MailApp.getRemainingDailyQuota();

function sendEmails( quotaLeft ) {
  if( ( lastRow - 1 ) > quotaLeft ){
    Browser.msgBox( "You have " + quotaLeft + " left and you're trying to send " + ( lastRow - 1 ) + "emails. Emails were not sent." );
  }
  else{
    for( var i = 2; i <= lastRow; i++ ) {
      var currentEmail = sheet.getRange( i, 1 ).getValue();
      var currentName  = sheet.getRange( i, 2 ).getValue();
      var currentClass = sheet.getRange( i, 3 ).getValue();
      var emailText = template.replace( "{name}", currentName ).replace( "{title}", currentClass );
      
      MailApp.sendEmail( currentEmail, "Reminder: " + currentClass + " Upcoming Class", emailText );
    }
  }
}

function dailyQuota(){
  Logger.log(quotaLeft);
}