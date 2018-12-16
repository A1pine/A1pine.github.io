PR.registerLangHandler(PR.createSimpleLexer([["pln",/^[\t\n\r \xA0]+/,null,"\t\n\r  "],["com",/^%[^\r\n]*/,null,"%"]],[["lit",/^\\(?:cr|l?dots|R|tab)\b/],["kwd",/^\\[a-zA-Z@]+/],["kwd",/^#(?:ifn?def|endif)/],["pln",/^\\[{}]/],["pun",/^[{}()\[\]]+/]]),["Rd","rd"]);