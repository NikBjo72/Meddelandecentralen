# Meddelandecentralen
En meddelandeapplikation för Concorde Hotel New York, för att kunna diskutera och meddela problem, status eller åtgärdade problem i olika rum/utrymmen.
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

## Länk till projekt och kanban-bräde på GitHub
>https://github.com/users/NikBjo72/projects/1/views/1