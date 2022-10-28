# Meddelandecentralen
En meddelandeapplikation för Concorde Hotel New York, för att kunna diskutera och meddela problem, status eller åtgärdade problem i olika rum/utrymmen.

## Förbered applikationen
> För att applikationen ska fungera måste npm ocg ASP.NET Core 5.0 vara installerade på datorn.
>1. Ladda ner källkoden genom att, på GitHub clicka på knappen Code och välja Download Zip. (För Projekt Meddelandecentralen: Överlämning välj taggen "inlamning")
>2. Packa upp Zipfilen.  
>3. Öppna/gå in i mappen /Meddelandecentralen-inlamning/ClientApp via en terninal (i kodeditorn eller separat) och skriv: npm ci

## Starta applikationen
>1. Öppna mappen /Meddelandecentralen-inlamning/ClientApp i terminalen eller terminalen i kodeditor och skriv: npm start
>2. Öppna mappen /Meddelandecentralen-inlamning/ i terminalen eller terminalen i kodeditor och skriv: dotnet run
>3. Öppna en webbläsare och adressfältet skriv in https://localhost:5001/. (Kan vara så att du behöver lägga till ett undantag för ej säker sida)

## Beskrivning av vald lösning
>Min tanke är att göra en hybridlösning av punkt **två** samt **tre** bland förslagen från VD:n.  
Varför jag vill göra en hybrid är med tanke på UX.   
Om vi t.ex. tänker att en medarbetare på hotellet kommer till jobbet efter en helgs ledighet så borde det första medarbetaren vill se vara status på olika utrymmen, inte börja med att söka på olika hashtags, eller läsa igenom två dagars konversation.   
När användaren ser vilka rum som är uppe i diskussionsforumet och vill se en specifik konversationen kring rummet/utrymmet, väljs rummet/utrymmet och alla meddelanden för rummet syns i en lista. Här går det då sortera på tid, avsändare, men även söka på hashtags, specifikt för rummet/utrymmet.   
Vill användaren skapa ett meddelande för det valda rummet, sker det enkelt genom att bara skriva text i det valda rummet, ev. hashtag och sedan skicka. I det valda rummet går det också sätta olika status på rummet.
Vi användaren skapa ett nytt rum med görs detta i rumöversikten, d.v.s. startsidan efter uppkoppling/inloggning.   
För att genomföra sparad rumsstatus och sparade meddelanden krävs dock en databas för de olika rummen samt meddelanden. Eftersom detta är en MVP blir det till en början bara seedade rum och dess status istället för en databas. Även seedade meddelanden för att simulera sparade meddelanden. Skulle det finnas tid över innan presentation av applikationen, så är det möjligt att en databas kan implementeras.   
Vid val av de olika rummen/utrymmena så ska det dock fungera att skriva realtidsmeddelanden, söka och filtrera.   
Min tanke är också att det ska gå att välja alla meddelanden, oberoende av rumsindelning. Detta för att kunna söka på en specifik hashtag för alla rummen. T.ex. #vattenläcka, då kommer alla meddelanden med den taggen upp samt vilket rum. På det viset går det få en samlad bild ifall det är vattenläckor i flera rum, eller kanske bara ett rum. Denna del ligger dock som prioritering två, då det viktigaste är att få rummen/utrymmena att fungera med dess meddelandefunktioner.

## Inlämningsinformation
>Länk till kanban-bräde och projekt på GitHub: https://github.com/users/NikBjo72/projects/1/views/1   
>Bilder på kanban-bräde ligger i mappen: /Documentation/Kanban-board-status   
>Klassdiagram ligger i mappen: /Documentation/Diagram/MDC-klassdiagram-v1.pdf   

## Artifakter och dokumentation finns i mappen /Documentation
>• Diagram (klassdiagran UI och WBS för API)   
>• Visuell design för UI   
>• Kanban-brädets statusbilder   
>• HTML-mockup på den visuella designen   

## Länk till visuell design i Figma
>https://www.figma.com/proto/JBu3K39ppmRJWF5s72Irpp/Meddelandecentralen?node-id=2%3A4&scaling=scale-down&page-id=0%3A1&starting-point-node-id=2%3A4