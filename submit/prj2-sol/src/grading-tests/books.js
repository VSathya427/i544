const BOOKS  = [
  {
    "title": "PL/SQL Reference Manual",
    "authors": [
      "Wadlington, Mariangeli",
      "Riffe, Gabriele"
    ],
    "isbn": "728-596-307-1",
    "pages": 404,
    "year": 2008,
    "publisher": "Manning",
    "nCopies": 3
  },
  {
    "title": "Fundamentals of Scala Programming",
    "authors": [
      "Woolheater, Rikki",
      "Windsheimer, Chasity",
      "Wedlow, Gary"
    ],
    "isbn": "541-930-481-8",
    "pages": 135,
    "year": 2011,
    "publisher": "O'Reilly",
    "nCopies": 3
  },
  {
    "title": "Ruby: The Definitive Guide",
    "authors": [
      "Aguirre, Tia",
      "Owens, Kameron",
      "Velasco, Jameson"
    ],
    "isbn": "661-972-367-4",
    "pages": 170,
    "year": 2009,
    "publisher": "Prentice-Hall",
    "nCopies": 2
  },
  {
    "title": "Intermediate Python Programming",
    "authors": [
      "Woolheater, Rikki",
      "Chamlee, Lorena"
    ],
    "isbn": "324-491-383-8",
    "pages": 366,
    "year": 2010,
    "publisher": "Addison-Wesley",
    "nCopies": 4
  },
  {
    "title": "PL/SQL: The Good Parts",
    "authors": [
      "Gandaria, Alani",
      "Knight, Jace",
      "Standly, Alison"
    ],
    "isbn": "368-176-809-5",
    "pages": 277,
    "year": 2012,
    "publisher": "Prentice-Hall",
    "nCopies": 3
  },
  {
    "title": "The Idiot's Guide to Go",
    "authors": [
      "Atkins, Elida",
      "Standly, Alison"
    ],
    "isbn": "072-361-155-5",
    "pages": 339,
    "year": 2006,
    "publisher": "Addison-Wesley",
    "nCopies": 3
  },
  {
    "title": "Fundamentals of C# Programming",
    "authors": [
      "Wojahn, Anamarie",
      "Willeford, Dexter",
      "Craig, Eugene"
    ],
    "isbn": "030-502-625-1",
    "pages": 487,
    "year": 2019,
    "publisher": "Addison-Wesley",
    "nCopies": 4
  },
  {
    "title": "Fundamentals of C Programming",
    "authors": [
      "Norman, Carter",
      "Dangers, Jaylen"
    ],
    "isbn": "217-482-483-9",
    "pages": 204,
    "year": 2014,
    "publisher": "Manning",
    "nCopies": 4
  },
  {
    "title": "Intermediate PL/SQL Programming",
    "authors": [
      "Weitz, Anna",
      "Gandaria, Alani"
    ],
    "isbn": "236-083-975-1",
    "pages": 289,
    "year": 2010,
    "publisher": "O'Reilly",
    "nCopies": 3
  },
  {
    "title": "Basics of Rust Programming",
    "authors": [
      "Craig, Hannah",
      "Wigfield, Myra",
      "Sheldrick, Ramiro"
    ],
    "isbn": "078-453-062-9",
    "pages": 409,
    "year": 2002,
    "publisher": "Prentice-Hall",
    "nCopies": 3
  },
  {
    "title": "Fundamentals of Rust Programming",
    "authors": [
      "Duggar, Jaycie",
      "Windsheimer, Chasity",
      "Standly, Alison"
    ],
    "isbn": "976-333-439-9",
    "pages": 287,
    "year": 2008,
    "publisher": "New Starch",
    "nCopies": 2
  },
  {
    "title": "Ruby: The Good Parts",
    "authors": [
      "Chavarria, Brenda",
      "Chamlee, Lorena",
      "Olivares, Javion",
      "Wigfield, Myra"
    ],
    "isbn": "242-291-616-3",
    "pages": 393,
    "year": 2005,
    "publisher": "Addison-Wesley",
    "nCopies": 2
  },
  {
    "title": "Programming in Go",
    "authors": [
      "Wojahn, Anamarie",
      "Dangers, Jaylen"
    ],
    "isbn": "227-005-342-3",
    "pages": 525,
    "year": 2019,
    "publisher": "O'Reilly",
    "nCopies": 2
  },
  {
    "title": "Basics of C# Programming",
    "authors": [
      "Alanis, Jaida",
      "Wilbrecht, Don",
      "Knight, Jace",
      "Wire, Brody"
    ],
    "isbn": "473-895-134-0",
    "pages": 131,
    "year": 2015,
    "publisher": "Manning",
    "nCopies": 4
  },
  {
    "title": "Scala: The Definitive Guide",
    "authors": [
      "Pichotta, Adriane"
    ],
    "isbn": "679-393-648-3",
    "pages": 122,
    "year": 2001,
    "publisher": "O'Reilly",
    "nCopies": 2
  },
  {
    "title": "Basics of PL/SQL Programming",
    "authors": [
      "Owens, Kameron",
      "Wigfield, Myra",
      "Riffe, Gabriele",
      "Weitz, Anna"
    ],
    "isbn": "821-210-421-3",
    "pages": 88,
    "year": 2004,
    "publisher": "O'Reilly",
    "nCopies": 4
  },
  {
    "title": "PL/SQL Programming Made Easy",
    "authors": [
      "Pichotta, Adriane",
      "Woolheater, Rikki"
    ],
    "isbn": "306-889-156-8",
    "pages": 366,
    "year": 2012,
    "publisher": "O'Reilly",
    "nCopies": 1
  },
  {
    "title": "Scala Programmers Reference",
    "authors": [
      "Pichotta, Adriane",
      "Weitz, Anna",
      "Gandaria, Deric"
    ],
    "isbn": "343-889-279-2",
    "pages": 557,
    "year": 2011,
    "publisher": "Prentice-Hall",
    "nCopies": 3
  },
  {
    "title": "Basics of Scala Programming",
    "authors": [
      "Sartor, Tracy"
    ],
    "isbn": "877-515-425-7",
    "pages": 274,
    "year": 2010,
    "publisher": "Manning",
    "nCopies": 3
  },
  {
    "title": "Advanced Ruby Programming",
    "authors": [
      "Weinberg, Johnathen",
      "Sheldrick, Ramiro",
      "Gandaria, Deric",
      "Gandaria, Alani"
    ],
    "isbn": "232-948-761-7",
    "pages": 326,
    "year": 2020,
    "publisher": "O'Reilly",
    "nCopies": 2
  },
  {
    "title": "Java Programmers Reference",
    "authors": [
      "Wigfield, Saul",
      "Norman, Carter",
      "Doubt, Marissa"
    ],
    "isbn": "861-858-853-6",
    "pages": 454,
    "year": 2014,
    "publisher": "Addison-Wesley",
    "nCopies": 3
  },
  {
    "title": "Fundamentals of PL/SQL Programming",
    "authors": [
      "Craig, Eugene",
      "Wigfield, Saul"
    ],
    "isbn": "915-949-676-2",
    "pages": 225,
    "year": 2011,
    "publisher": "Addison-Wesley",
    "nCopies": 3
  },
  {
    "title": "PL/SQL Simplified",
    "authors": [
      "Norman, Carter",
      "Wadlington, Mariangeli",
      "Crenshaw, Ryen"
    ],
    "isbn": "166-495-280-2",
    "pages": 242,
    "year": 2018,
    "publisher": "Addison-Wesley",
    "nCopies": 3
  },
  {
    "title": "Swift Reference Manual",
    "authors": [
      "Sarabia, Sandra",
      "Owens, Kameron",
      "Olivares, Javion"
    ],
    "isbn": "057-778-838-5",
    "pages": 410,
    "year": 2004,
    "publisher": "Manning",
    "nCopies": 4
  },
  {
    "title": "JavaScript Programmers Reference",
    "authors": [
      "Dangers, Jaylen",
      "Tannehill, Everett"
    ],
    "isbn": "387-267-458-7",
    "pages": 362,
    "year": 2011,
    "publisher": "New Starch",
    "nCopies": 4
  },
  {
    "title": "JavaScript Programming Made Easy",
    "authors": [
      "Gandaria, Deric",
      "Aguirre, Tia",
      "Wigfield, Saul"
    ],
    "isbn": "215-346-226-5",
    "pages": 133,
    "year": 2013,
    "publisher": "Prentice-Hall",
    "nCopies": 4
  },
  {
    "title": "The ABC's of Python Programming",
    "authors": [
      "Clemens, Danae",
      "Woolheater, Rikki"
    ],
    "isbn": "721-345-840-3",
    "pages": 287,
    "year": 2009,
    "publisher": "Prentice-Hall",
    "nCopies": 3
  },
  {
    "title": "C Programmers Reference",
    "authors": [
      "Riffe, Gabriele",
      "Sheldrick, Ramiro",
      "Sarabia, Sandra"
    ],
    "isbn": "033-140-277-4",
    "pages": 197,
    "year": 2013,
    "publisher": "Pearson",
    "nCopies": 2
  },
  {
    "title": "Basics of Python Programming",
    "authors": [
      "Sheldrick, Ramiro",
      "Tannehill, Everett"
    ],
    "isbn": "643-977-256-7",
    "pages": 132,
    "year": 2010,
    "publisher": "New Starch",
    "nCopies": 1
  },
  {
    "title": "Fundamentals of Ruby Programming",
    "authors": [
      "Arnold, Shae"
    ],
    "isbn": "590-094-309-4",
    "pages": 547,
    "year": 2010,
    "publisher": "Prentice-Hall",
    "nCopies": 2
  },
  {
    "title": "JavaScript Prats and Pitfalls",
    "authors": [
      "Wedlow, Gary",
      "Riffe, Gabriele",
      "Clemens, Danae",
      "Anguiano, Tynia"
    ],
    "isbn": "823-126-010-2",
    "pages": 222,
    "year": 2018,
    "publisher": "Pearson",
    "nCopies": 3
  },
  {
    "title": "Advanced Go Programming",
    "authors": [
      "Knight, Jace",
      "Alanis, Jaida",
      "Willeford, Dexter"
    ],
    "isbn": "230-719-793-4",
    "pages": 396,
    "year": 2019,
    "publisher": "Pearson",
    "nCopies": 4
  },
  {
    "title": "The Idiot's Guide to Scala",
    "authors": [
      "Standly, Alison",
      "Wunder, Derek",
      "Casas, Aiden"
    ],
    "isbn": "406-299-651-0",
    "pages": 133,
    "year": 2009,
    "publisher": "Manning",
    "nCopies": 4
  },
  {
    "title": "The Idiot's Guide to JavaScript",
    "authors": [
      "Wojahn, Anamarie",
      "Alanis, Jaida",
      "Weigt, Aileen"
    ],
    "isbn": "403-747-725-3",
    "pages": 314,
    "year": 2003,
    "publisher": "New Starch",
    "nCopies": 2
  },
  {
    "title": "Advanced Scala Programming",
    "authors": [
      "Tannehill, Everett",
      "Wedlow, Gary",
      "Weigt, Aileen"
    ],
    "isbn": "506-469-580-0",
    "pages": 482,
    "year": 2005,
    "publisher": "Addison-Wesley",
    "nCopies": 1
  },
  {
    "title": "Ruby Simplified",
    "authors": [
      "Atkins, Elida",
      "Knight, Jace"
    ],
    "isbn": "211-924-046-3",
    "pages": 186,
    "year": 2007,
    "publisher": "New Starch",
    "nCopies": 1
  },
  {
    "title": "C++ Programmers Reference",
    "authors": [
      "Atkins, Elida",
      "Doubt, Marissa"
    ],
    "isbn": "923-174-962-8",
    "pages": 579,
    "year": 2000,
    "publisher": "New Starch",
    "nCopies": 2
  },
  {
    "title": "The Idiot's Guide to C",
    "authors": [
      "Casas, Aiden",
      "Arnold, Shae"
    ],
    "isbn": "807-606-130-2",
    "pages": 340,
    "year": 2007,
    "publisher": "O'Reilly",
    "nCopies": 2
  },
  {
    "title": "Basics of Java Programming",
    "authors": [
      "Wilbrecht, Don",
      "Aguirre, Tia",
      "Owens, Kameron"
    ],
    "isbn": "528-686-453-9",
    "pages": 365,
    "year": 2019,
    "publisher": "Manning",
    "nCopies": 1
  },
  {
    "title": "Basics of Swift Programming",
    "authors": [
      "Wunder, Derek",
      "Sheldrick, Ramiro"
    ],
    "isbn": "260-544-208-3",
    "pages": 521,
    "year": 2007,
    "publisher": "Manning",
    "nCopies": 2
  },
  {
    "title": "Python Reference Manual",
    "authors": [
      "Duggar, Jaycie",
      "Velasco, Jameson",
      "Everhart, Kelsey"
    ],
    "isbn": "608-460-163-7",
    "pages": 330,
    "year": 2005,
    "publisher": "Prentice-Hall",
    "nCopies": 4
  },
  {
    "title": "PL/SQL: The Definitive Guide",
    "authors": [
      "Sarabia, Sandra",
      "Tannehill, Everett",
      "Chamlee, Lorena"
    ],
    "isbn": "708-911-231-5",
    "pages": 406,
    "year": 2003,
    "publisher": "New Starch",
    "nCopies": 4
  },
  {
    "title": "Programming in Ruby",
    "authors": [
      "Casas, Aiden",
      "Clemens, Danae",
      "Norman, Carter"
    ],
    "isbn": "328-835-281-4",
    "pages": 485,
    "year": 2012,
    "publisher": "New Starch",
    "nCopies": 2
  },
  {
    "title": "Advanced Rust Programming",
    "authors": [
      "Anguiano, Tynia",
      "Standly, Alison"
    ],
    "isbn": "953-425-561-7",
    "pages": 588,
    "year": 2014,
    "publisher": "New Starch",
    "nCopies": 2
  },
  {
    "title": "Java Reference Manual",
    "authors": [
      "Olivares, Javion",
      "Pichotta, Adriane"
    ],
    "isbn": "461-206-121-3",
    "pages": 380,
    "year": 2005,
    "publisher": "New Starch",
    "nCopies": 4
  },
  {
    "title": "Fundamentals of JavaScript Programming",
    "authors": [
      "Aguirre, Tia",
      "Weitz, Anna",
      "Sarabia, Sandra"
    ],
    "isbn": "910-233-805-6",
    "pages": 397,
    "year": 2000,
    "publisher": "Prentice-Hall",
    "nCopies": 3
  },
  {
    "title": "The Idiot's Guide to Ruby",
    "authors": [
      "Willeford, Dexter",
      "Cockfield, Kyla",
      "Olivares, Javion",
      "Atkins, Elida"
    ],
    "isbn": "878-082-293-9",
    "pages": 279,
    "year": 2012,
    "publisher": "New Starch",
    "nCopies": 4
  },
  {
    "title": "Programming in Rust",
    "authors": [
      "Wedlow, Gary",
      "Wadlington, Mariangeli"
    ],
    "isbn": "989-386-341-4",
    "pages": 87,
    "year": 2019,
    "publisher": "O'Reilly",
    "nCopies": 1
  },
  {
    "title": "Ruby In Action",
    "authors": [
      "Woolheater, Rikki"
    ],
    "isbn": "398-037-939-0",
    "pages": 597,
    "year": 2018,
    "publisher": "Pearson",
    "nCopies": 3
  },
  {
    "title": "Ruby Programmers Reference",
    "authors": [
      "Witkowski, Willis",
      "Weigt, Aileen",
      "Wedlow, Gary"
    ],
    "isbn": "881-258-945-7",
    "pages": 356,
    "year": 2005,
    "publisher": "Manning",
    "nCopies": 1
  },
  {
    "title": "Fundamentals of C++ Programming",
    "authors": [
      "Gandaria, Deric",
      "Winkel, Bretton",
      "Velasco, Jameson"
    ],
    "isbn": "703-601-559-1",
    "pages": 542,
    "year": 2008,
    "publisher": "O'Reilly",
    "nCopies": 3
  },
  {
    "title": "Fundamentals of Go Programming",
    "authors": [
      "Riffe, Gabriele",
      "Pichotta, Adriane",
      "Clemens, Danae"
    ],
    "isbn": "433-587-712-0",
    "pages": 458,
    "year": 2015,
    "publisher": "Addison-Wesley",
    "nCopies": 2
  },
  {
    "title": "Basics of Ruby Programming",
    "authors": [
      "Uecker, Koby"
    ],
    "isbn": "793-138-744-1",
    "pages": 410,
    "year": 2005,
    "publisher": "O'Reilly",
    "nCopies": 2
  },
  {
    "title": "The Idiot's Guide to Rust",
    "authors": [
      "Owens, Kameron",
      "Casas, Aiden",
      "Chamlee, Lorena",
      "Weinberg, Johnathen"
    ],
    "isbn": "717-672-140-0",
    "pages": 374,
    "year": 2013,
    "publisher": "O'Reilly",
    "nCopies": 3
  },
  {
    "title": "PL/SQL Programmers Reference",
    "authors": [
      "Norman, Carter",
      "Wilbrecht, Don",
      "Tannehill, Everett",
      "Dangers, Jaylen"
    ],
    "isbn": "579-589-032-7",
    "pages": 467,
    "year": 2011,
    "publisher": "O'Reilly",
    "nCopies": 4
  },
  {
    "title": "Rust Programmers Reference",
    "authors": [
      "Norman, Carter"
    ],
    "isbn": "332-243-446-9",
    "pages": 223,
    "year": 2017,
    "publisher": "Addison-Wesley",
    "nCopies": 1
  },
  {
    "title": "The Idiot's Guide to Java",
    "authors": [
      "Willeford, Dexter"
    ],
    "isbn": "506-539-191-2",
    "pages": 406,
    "year": 2017,
    "publisher": "O'Reilly",
    "nCopies": 2
  },
  {
    "title": "Ruby Prats and Pitfalls",
    "authors": [
      "Wigfield, Myra",
      "Cockfield, Kyla"
    ],
    "isbn": "828-171-237-7",
    "pages": 217,
    "year": 2005,
    "publisher": "New Starch",
    "nCopies": 4
  },
  {
    "title": "Python: The Definitive Guide",
    "authors": [
      "Arnold, Shae",
      "Chamlee, Lorena",
      "Weitz, Anna"
    ],
    "isbn": "226-586-404-5",
    "pages": 290,
    "year": 2014,
    "publisher": "Pearson",
    "nCopies": 4
  },
  {
    "title": "Advanced JavaScript Programming",
    "authors": [
      "Windsheimer, Chasity",
      "Weinberg, Johnathen"
    ],
    "isbn": "791-015-850-1",
    "pages": 534,
    "year": 2017,
    "publisher": "Pearson",
    "nCopies": 3
  },
  {
    "title": "Programming in Scala",
    "authors": [
      "Riffe, Gabriele",
      "Tannehill, Everett",
      "Weitz, Anna",
      "Uecker, Koby"
    ],
    "isbn": "082-229-987-2",
    "pages": 546,
    "year": 2017,
    "publisher": "Manning",
    "nCopies": 2
  },
  {
    "title": "PL/SQL Prats and Pitfalls",
    "authors": [
      "Casas, Aiden",
      "Everhart, Kelsey",
      "Woolheater, Rikki",
      "Chamlee, Lorena"
    ],
    "isbn": "830-016-000-0",
    "pages": 570,
    "year": 2016,
    "publisher": "Manning",
    "nCopies": 2
  },
  {
    "title": "Python Programmers Reference",
    "authors": [
      "Weitz, Anna"
    ],
    "isbn": "525-633-599-6",
    "pages": 354,
    "year": 2020,
    "publisher": "Addison-Wesley",
    "nCopies": 3
  },
  {
    "title": "Ruby Reference Manual",
    "authors": [
      "Clemens, Danae",
      "Atkins, Elida",
      "Wigfield, Saul"
    ],
    "isbn": "775-464-798-6",
    "pages": 490,
    "year": 2016,
    "publisher": "O'Reilly",
    "nCopies": 1
  },
  {
    "title": "Python Prats and Pitfalls",
    "authors": [
      "Dangers, Jaylen",
      "Witkowski, Willis",
      "Weinberg, Johnathen"
    ],
    "isbn": "307-070-809-6",
    "pages": 250,
    "year": 2004,
    "publisher": "Addison-Wesley",
    "nCopies": 3
  },
  {
    "title": "The ABC's of Ruby Programming",
    "authors": [
      "Chamlee, Lorena",
      "Winkel, Bretton",
      "Olivares, Javion"
    ],
    "isbn": "816-444-422-1",
    "pages": 152,
    "year": 2019,
    "publisher": "O'Reilly",
    "nCopies": 2
  },
  {
    "title": "The Idiot's Guide to Swift",
    "authors": [
      "Sheldrick, Ramiro",
      "Norman, Carter",
      "Witkowski, Willis"
    ],
    "isbn": "473-380-979-2",
    "pages": 230,
    "year": 2018,
    "publisher": "Pearson",
    "nCopies": 3
  },
  {
    "title": "The Idiot's Guide to Python",
    "authors": [
      "Sarabia, Sandra"
    ],
    "isbn": "954-166-852-5",
    "pages": 285,
    "year": 2010,
    "publisher": "O'Reilly",
    "nCopies": 1
  },
  {
    "title": "Basics of C++ Programming",
    "authors": [
      "Atkins, Elida",
      "Weitz, Anna",
      "Doubt, Marissa"
    ],
    "isbn": "707-680-629-4",
    "pages": 557,
    "year": 2011,
    "publisher": "Addison-Wesley",
    "nCopies": 2
  },
  {
    "title": "The Idiot's Guide to C#",
    "authors": [
      "Crenshaw, Ryen",
      "Arnold, Shae",
      "Cockfield, Kyla"
    ],
    "isbn": "081-655-790-1",
    "pages": 243,
    "year": 2018,
    "publisher": "New Starch",
    "nCopies": 4
  },
  {
    "title": "Intermediate JavaScript Programming",
    "authors": [
      "Sarabia, Sandra",
      "Cockfield, Kyla"
    ],
    "isbn": "070-094-483-4",
    "pages": 455,
    "year": 2017,
    "publisher": "Prentice-Hall",
    "nCopies": 2
  },
  {
    "title": "Basics of JavaScript Programming",
    "authors": [
      "Clemens, Danae",
      "Craig, Hannah",
      "Wunder, Derek"
    ],
    "isbn": "732-641-074-7",
    "pages": 417,
    "year": 2014,
    "publisher": "Addison-Wesley",
    "nCopies": 3
  },
  {
    "title": "Basics of C Programming",
    "authors": [
      "Aguirre, Tia"
    ],
    "isbn": "224-373-195-1",
    "pages": 194,
    "year": 2020,
    "publisher": "O'Reilly",
    "nCopies": 3
  },
  {
    "title": "Advanced PL/SQL Programming",
    "authors": [
      "Cockfield, Kyla",
      "Tannehill, Everett"
    ],
    "isbn": "945-769-407-0",
    "pages": 396,
    "year": 2014,
    "publisher": "Prentice-Hall",
    "nCopies": 3
  },
  {
    "title": "Fundamentals of Swift Programming",
    "authors": [
      "Pichotta, Adriane",
      "Spicer, Quintyn",
      "Willeford, Dexter"
    ],
    "isbn": "271-099-630-3",
    "pages": 212,
    "year": 2011,
    "publisher": "Addison-Wesley",
    "nCopies": 3
  },
  {
    "title": "Intermediate Ruby Programming",
    "authors": [
      "Anguiano, Tynia",
      "Weitz, Anna",
      "Spicer, Quintyn"
    ],
    "isbn": "642-902-209-8",
    "pages": 425,
    "year": 2014,
    "publisher": "Pearson",
    "nCopies": 2
  },
  {
    "title": "Ruby Programming Made Easy",
    "authors": [
      "Cockfield, Kyla",
      "Dangers, Jaylen"
    ],
    "isbn": "799-065-747-0",
    "pages": 318,
    "year": 2019,
    "publisher": "O'Reilly",
    "nCopies": 1
  },
  {
    "title": "C# Programmers Reference",
    "authors": [
      "Wojahn, Anamarie",
      "Weitz, Anna"
    ],
    "isbn": "397-650-070-1",
    "pages": 430,
    "year": 2006,
    "publisher": "New Starch",
    "nCopies": 3
  },
  {
    "title": "Programming in Python",
    "authors": [
      "Pichotta, Adriane",
      "Woolheater, Rikki"
    ],
    "isbn": "612-109-251-7",
    "pages": 291,
    "year": 2008,
    "publisher": "O'Reilly",
    "nCopies": 3
  },
  {
    "title": "Fundamentals of Java Programming",
    "authors": [
      "Gandaria, Deric",
      "Wilbrecht, Don",
      "Owens, Kameron",
      "Weitz, Anna"
    ],
    "isbn": "063-585-780-1",
    "pages": 257,
    "year": 2019,
    "publisher": "Pearson",
    "nCopies": 4
  },
  {
    "title": "JavaScript: The Definitive Guide",
    "authors": [
      "Uecker, Koby",
      "Chamlee, Lorena"
    ],
    "isbn": "021-578-548-4",
    "pages": 421,
    "year": 2011,
    "publisher": "New Starch",
    "nCopies": 2
  },
  {
    "title": "The ABC's of JavaScript Programming",
    "authors": [
      "Atkins, Elida",
      "Wire, Brody",
      "Norman, Carter",
      "Velasco, Jameson"
    ],
    "isbn": "555-992-091-2",
    "pages": 565,
    "year": 2009,
    "publisher": "Manning",
    "nCopies": 3
  },
  {
    "title": "Go Prats and Pitfalls",
    "authors": [
      "Wigfield, Saul",
      "Dangers, Jaylen",
      "Duggar, Jaycie",
      "Casas, Aiden"
    ],
    "isbn": "065-145-402-8",
    "pages": 452,
    "year": 2005,
    "publisher": "O'Reilly",
    "nCopies": 3
  },
  {
    "title": "Python: The Good Parts",
    "authors": [
      "Doubt, Marissa",
      "Weigt, Aileen"
    ],
    "isbn": "440-649-992-1",
    "pages": 187,
    "year": 2018,
    "publisher": "O'Reilly",
    "nCopies": 2
  },
  {
    "title": "Scala: The Good Parts",
    "authors": [
      "Uecker, Koby"
    ],
    "isbn": "221-274-835-5",
    "pages": 372,
    "year": 2006,
    "publisher": "Prentice-Hall",
    "nCopies": 4
  },
  {
    "title": "C Reference Manual",
    "authors": [
      "Craig, Hannah",
      "Pichotta, Adriane"
    ],
    "isbn": "900-584-423-1",
    "pages": 209,
    "year": 2003,
    "publisher": "Pearson",
    "nCopies": 1
  },
  {
    "title": "Rust Reference Manual",
    "authors": [
      "Craig, Hannah",
      "Aragon, Alexandro"
    ],
    "isbn": "397-499-024-0",
    "pages": 461,
    "year": 2006,
    "publisher": "Addison-Wesley",
    "nCopies": 4
  },
  {
    "title": "Intermediate Go Programming",
    "authors": [
      "Clemens, Danae",
      "Wilbrecht, Don",
      "Witkowski, Willis",
      "Olivares, Javion"
    ],
    "isbn": "720-156-886-4",
    "pages": 112,
    "year": 2016,
    "publisher": "Addison-Wesley",
    "nCopies": 3
  },
  {
    "title": "Go Reference Manual",
    "authors": [
      "Aguirre, Tia",
      "Wigfield, Saul",
      "Wigfield, Myra",
      "Duggar, Jaycie"
    ],
    "isbn": "900-157-799-4",
    "pages": 584,
    "year": 2014,
    "publisher": "Addison-Wesley",
    "nCopies": 3
  },
  {
    "title": "Rust: The Good Parts",
    "authors": [
      "Cockfield, Kyla",
      "Gandaria, Alani"
    ],
    "isbn": "706-142-103-8",
    "pages": 560,
    "year": 2006,
    "publisher": "O'Reilly",
    "nCopies": 3
  },
  {
    "title": "Programming in JavaScript",
    "authors": [
      "Weitz, Anna",
      "Gandaria, Alani",
      "Alanis, Jaida"
    ],
    "isbn": "535-020-763-2",
    "pages": 121,
    "year": 2005,
    "publisher": "New Starch",
    "nCopies": 3
  },
  {
    "title": "Go Programmers Reference",
    "authors": [
      "Atkins, Elida",
      "Craig, Eugene",
      "Uecker, Koby"
    ],
    "isbn": "304-313-178-3",
    "pages": 136,
    "year": 2004,
    "publisher": "New Starch",
    "nCopies": 2
  },
  {
    "title": "Basics of Go Programming",
    "authors": [
      "Arnold, Shae",
      "Tannehill, Everett",
      "Uecker, Koby"
    ],
    "isbn": "991-213-666-7",
    "pages": 295,
    "year": 2015,
    "publisher": "New Starch",
    "nCopies": 1
  },
  {
    "title": "C# Reference Manual",
    "authors": [
      "Knight, Jace",
      "Norman, Carter",
      "Gandaria, Deric",
      "Duggar, Jaycie"
    ],
    "isbn": "137-510-949-2",
    "pages": 396,
    "year": 2001,
    "publisher": "O'Reilly",
    "nCopies": 3
  },
  {
    "title": "Scala Reference Manual",
    "authors": [
      "Wojahn, Anamarie",
      "Sartor, Tracy",
      "Witkowski, Willis"
    ],
    "isbn": "493-355-263-6",
    "pages": 113,
    "year": 2018,
    "publisher": "O'Reilly",
    "nCopies": 4
  },
  {
    "title": "C++ Reference Manual",
    "authors": [
      "Duggar, Jaycie",
      "Crenshaw, Ryen",
      "Weigt, Aileen"
    ],
    "isbn": "704-476-456-7",
    "pages": 410,
    "year": 2012,
    "publisher": "Addison-Wesley",
    "nCopies": 1
  },
  {
    "title": "The ABC's of PL/SQL Programming",
    "authors": [
      "Chamlee, Lorena"
    ],
    "isbn": "678-796-786-0",
    "pages": 591,
    "year": 2015,
    "publisher": "Addison-Wesley",
    "nCopies": 2
  },
  {
    "title": "Go: The Good Parts",
    "authors": [
      "Uecker, Koby",
      "Olivares, Javion",
      "Sartor, Tracy",
      "Wadlington, Mariangeli"
    ],
    "isbn": "300-227-699-4",
    "pages": 312,
    "year": 2013,
    "publisher": "New Starch",
    "nCopies": 2
  },
  {
    "title": "Intermediate Scala Programming",
    "authors": [
      "Gandaria, Alani",
      "Weigt, Aileen",
      "Uecker, Koby"
    ],
    "isbn": "556-480-975-2",
    "pages": 308,
    "year": 2013,
    "publisher": "Prentice-Hall",
    "nCopies": 2
  },
  {
    "title": "JavaScript: The Definitive Guide, 7th Edition",
    "authors": [
      "David Flanagan"
    ],
    "isbn": "149-195-202-4",
    "pages": 704,
    "year": 2020,
    "publisher": "O'Reilly",
    "nCopies": 2
  }
]

export default BOOKS;
