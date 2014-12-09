module TSOS {

    export class HardDrive {

        constructor() {

            for(var t = 0; t < 4; t++) {

                for(var s = 0; s < 8; s++) {

                    for(var b = 0; b < 8; b++) {

                        if (t === 0)
                            sessionStorage.setItem("" + t + s + b, '0&&&************************************************************************************************************************');
                        else
                            sessionStorage.setItem("" + t + s + b, '0&&&~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

                    }

                }

            }

            sessionStorage.setItem("000", '1&&&************************************************************************************************************************');

        }

        public formatHDD(): void {

            for(var t = 0; t < 4; t++) {

                for(var s = 0; s < 8; s++) {

                    for(var b = 0; b < 8; b++) {

                        if (t === 0)
                            sessionStorage.setItem("" + t + s + b, '0&&&************************************************************************************************************************');
                        else
                            sessionStorage.setItem("" + t + s + b, '0&&&~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

                    }

                }

            }

            sessionStorage.setItem("000", '1&&&************************************************************************************************************************');

        }

        public readFile(fileName: string) {

            var t:string = "0";
            var location: string = "";
            var data:string = "";

            for(var s = 0; s < 8; s++) {

                for(var b = 0; b < 8; b++) {

                    var hddBlock:string = sessionStorage.getItem(t + s + b);
                    if (hddBlock.charAt(0) === '1') {

                        var loc: string = hddBlock.substr(1,3);
                        hddBlock = hddBlock.substr(4);
                        hddBlock = hddBlock.replace('*', '');

                        if (hddBlock === fileName.trim()) {

                            location = loc;
                            //break;

                        }

                    }

                    //if (location !== "")
                        //break;

                }

                //if (location !== "")
                    //break;

            }

            while (location !== "&&&") {

                var blockData:string = sessionStorage.getItem(location);
                blockData = blockData.substr(4);
                location = blockData.substr(1, 3);
                data += blockData;

            }

            var blockDataFinal:string = sessionStorage.getItem(location);
            blockDataFinal = blockDataFinal.substr(4);
            blockDataFinal = blockDataFinal.replace('~', '');
            data += blockDataFinal;

            _StdOut.putText(this.convertHexToString(data));

        }

        public deleteFile(fileName: string) {

            var fileNameHex = this.convertStringToHex(fileName);
            console.log(fileNameHex);
            var t:string = "0";
            var loc:string = "";
            var fileFound: boolean = false;
            var noSuchFileExists: boolean = false;

            for (var s = 0; s < 8; s++) {

                for (var b = 0; b < 8; b++) {

                    var hddBlock:string = sessionStorage.getItem("" + t + s + b);
                    var possibleMatch:string = hddBlock.substr(4, fileName.length * 2);
                    console.log(possibleMatch);

                    if ((s === 7) && (b === 7) && (possibleMatch !== fileNameHex)) {

                        noSuchFileExists = true;

                    }

                    if (possibleMatch === fileNameHex) {

                        loc = t + s + b;
                        fileFound = true;

                    }

                    if (fileFound || noSuchFileExists)
                        break;

                }

                if (fileFound || noSuchFileExists)
                    break;

            }

            if (noSuchFileExists) {

                _StdOut.putText("Error: No Such File Exists on Disk...");

            }

            else if (fileFound) {

                console.log(loc);
                var hddB:string = sessionStorage.getItem(loc);
                var blockData:string = hddB.substr(4);
                var nextLoc:string = hddB.substr(1,3);

                while (loc !== "&&&") {

                    sessionStorage.setItem(loc, "0&&&" + blockData);
                    loc = nextLoc;
                    if (loc !== '&&&') {
                        hddB = sessionStorage.getItem(loc);
                        blockData = hddB.substr(4);
                        nextLoc = hddB.substr(1, 3);
                    }

                }

                _StdOut.putText("File " + fileName + " Deleted From Disk");

            }


        }

        public createFile(fileName:string) {

            var fn:string = fileName;

            var fileLoc:string = this.findNextEmptyNameBlock();
            if (fileLoc === '&&&') {
                _StdOut.putText('ERROR: FILE NAME MEMORY ON HDD FULL');
            }
            else {

                var storeString:string = '';
                var len: number = fileName.length;

                for (var i = 0; i < 60; i++) {

                    if (i < len) {

                        var ch:string = fileName.charAt(i);
                        storeString = storeString + this.charToHex(ch);

                    }
                    else {

                        storeString = storeString + '**';

                    }

                }

                sessionStorage.setItem(fileLoc, '1&&&' + storeString);
                _StdOut.putText("File " + fn + " Created On Disk")
            }

        }

        public writeFile(fileName: string, dataString: string) {

            var writeSuccess:boolean = false;
            var writeFailure:boolean = false;
            var fileNameFound:boolean = false;
            var t:string = "0";
            var thisLoc: string;


            for (var s = 0; s < 8; s++) {

                for (var b = 0; b < 8; b++) {

                    var hddBlock:string = sessionStorage.getItem(t + s + b);

                    if ((s === 7) && (b === 7) && !fileNameFound) {

                        writeFailure = true;
                        console.log("file not found");
                        break;

                    }

                    var tempFileName: string = this.convertHexToString(hddBlock.substr(4, fileName.length * 2));
                    if (fileName === tempFileName) {

                        fileNameFound = true;
                        //thisLoc = "" + t + s + b;
                        console.log("file match found");
                        if (hddBlock.substr(1,3) !== '&&&')
                            var tempLoc = hddBlock.substr(1,3);
                        else
                            var tempLoc: string = this.findNextEmptyBlock();
                        thisLoc = tempLoc;
                        if (tempLoc !== '&&&') {

                            sessionStorage.setItem(t + s + b, hddBlock.charAt(0) + tempLoc + hddBlock.substr(4));
                            //this.clearOldData(tempLoc);
                            //hddBlock = sessionStorage.getItem(tempLoc);
                            console.log(dataString.length + "");
                            while ((dataString.length >= 60) && (tempLoc !== '&&&')) {

                                console.log("entered 60+ loop");

                                hddBlock = sessionStorage.getItem(tempLoc);

                                var tempData = dataString.substr(0, 60);
                                dataString = dataString.substr(60);
                                thisLoc = tempLoc;
                                if (dataString.length > 0)
                                    if (hddBlock.substr(1,3) !== '&&&')
                                        tempLoc = hddBlock.substr(1,3);
                                    else
                                        tempLoc = this.findNextEmptyBlock();
                                else
                                    tempLoc = '&&&';
                                tempData = this.convertStringToHex(tempData);
                                sessionStorage.setItem(thisLoc, '1' + tempLoc + tempData);

                            }

                            if ((dataString.length > 0) && (tempLoc === '&&&')) {

                                //_StdOut.putText('ERROR: MEMORY FULL... PLEASE CLEAR MEMORY');
                                console.log("len > 0 but tempLoc == &&&");
                                writeFailure = true;

                            }

                            else if ((dataString.length > 0) && (tempLoc !== '&&&') && !writeFailure) {

                                var lastData = '';

                                for (var j = 0; j < 60; j++) {

                                    if (dataString.length > 0) {
                                        lastData = lastData + this.charToHex(dataString.charAt(0));
                                        dataString = dataString.substr(1);
                                    }
                                    else
                                        lastData = lastData + '~~';

                                }

                                sessionStorage.setItem(thisLoc, '1&&&' + lastData);
                                console.log("last data written");
                                writeSuccess = true;

                            }


                        }

                        else {
                            //_StdOut.putText('ERROR: MEMORY FULL... PLEASE CLEAR MEMORY');
                            console.log("no space found to write");
                            writeFailure = true;
                        }

                    }

                    //else {
                        //_StdOut.putText("ERROR: SPECIFIED FILE COULD NOT BE FOUND");
                    //    writeFailure = true;
                    //}


                    if (writeSuccess || writeFailure)
                        break;

                }

                if (writeSuccess || writeFailure)
                    break;

            }


            if (writeSuccess)
                _StdOut.putText("File Written");

            else if (writeFailure)
                _StdOut.putText("Error: Memory Full... File Not Written");

        }

        public convertStringToHex(data: string): string {

            var hexString: string = "";

            for (var i = 0; i < data.length; i++) {

                hexString = hexString + this.charToHex(data.charAt(i));

            }

            return hexString;

        }

        public convertHexToString(data: string): string {

            var textString: string = "";

            for (var i = 0; i < data.length; i += 2) {

                textString = textString + this.hexToChar("" + data.charAt(i) + data.charAt(i + 1));

            }

            return textString;

        }

        public charToHex(ch: string): string {

            switch(ch) {

                case ' ' : {return "20"}
                case '!' : {return "21"}
                case '\"' : {return "22"}
                case '#' : {return "23"}
                case '$' : {return "24"}
                case '%' : {return "25"}
                case '&' : {return "26"}
                case '\'' : {return "27"}
                case '(' : {return "28"}
                case ')' : {return "29"}
                case '*' : {return "2A"}
                case '+' : {return "2B"}
                case ',' : {return "2C"}
                case '-' : {return "2D"}
                case '.' : {return "2E"}
                case '/' : {return "2F"}
                case '0' : {return "30"}
                case '1' : {return "31"}
                case '2' : {return "32"}
                case '3' : {return "33"}
                case '4' : {return "34"}
                case '5' : {return "35"}
                case '6' : {return "36"}
                case '7' : {return "37"}
                case '8' : {return "38"}
                case '9' : {return "39"}
                case ':' : {return "3A"}
                case ';' : {return "3B"}
                case '<' : {return "3C"}
                case '=' : {return "3D"}
                case '>' : {return "3E"}
                case '?' : {return "3F"}
                case '@' : {return "40"}
                case 'A' : {return "41"}
                case 'B' : {return "42"}
                case 'C' : {return "43"}
                case 'D' : {return "44"}
                case 'E' : {return "45"}
                case 'F' : {return "46"}
                case 'G' : {return "47"}
                case 'H' : {return "48"}
                case 'I' : {return "49"}
                case 'J' : {return "4A"}
                case 'K' : {return "4B"}
                case 'L' : {return "4C"}
                case 'M' : {return "4D"}
                case 'N' : {return "4E"}
                case 'O' : {return "4F"}
                case 'P' : {return "50"}
                case 'Q' : {return "51"}
                case 'R' : {return "52"}
                case 'S' : {return "53"}
                case 'T' : {return "54"}
                case 'U' : {return "55"}
                case 'V' : {return "56"}
                case 'W' : {return "57"}
                case 'X' : {return "58"}
                case 'Y' : {return "59"}
                case 'Z' : {return "5A"}
                case '[' : {return "5B"}
                case '\\' : {return "5C"}
                case ']' : {return "5D"}
                case '^' : {return "5E"}
                case '_' : {return "5F"}
                case '`' : {return "60"}
                case 'a' : {return "61"}
                case 'b' : {return "62"}
                case 'c' : {return "63"}
                case 'd' : {return "64"}
                case 'e' : {return "65"}
                case 'f' : {return "66"}
                case 'g' : {return "67"}
                case 'h' : {return "68"}
                case 'i' : {return "69"}
                case 'j' : {return "6A"}
                case 'k' : {return "6B"}
                case 'l' : {return "6C"}
                case 'm' : {return "6D"}
                case 'n' : {return "6E"}
                case 'o' : {return "6F"}
                case 'p' : {return "70"}
                case 'q' : {return "71"}
                case 'r' : {return "72"}
                case 's' : {return "73"}
                case 't' : {return "74"}
                case 'u' : {return "75"}
                case 'v' : {return "76"}
                case 'w' : {return "77"}
                case 'x' : {return "78"}
                case 'y' : {return "79"}
                case 'z' : {return "7A"}
                case '{' : {return "7B"}
                case '|' : {return "7C"}
                case '}' : {return "7D"}
                case '~' : {return "7E"}

            }

        }

        public hexToChar(hx: string): string {

            switch(hx) {

                case "20" : {return ' '}
                case "21" : {return '!'}
                case "22" : {return '\"'}
                case "23" : {return '#'}
                case "24" : {return '$'}
                case "25" : {return '%'}
                case "26" : {return '&'}
                case "27" : {return '\''}
                case "28" : {return '('}
                case "29" : {return ')'}
                case "2A" : {return '*'}
                case "2B" : {return '+'}
                case "2C" : {return ','}
                case "2D" : {return '-'}
                case "2E" : {return '.'}
                case "2F" : {return '/'}
                case "30" : {return '0'}
                case "31" : {return '1'}
                case "32" : {return '2'}
                case "33" : {return '3'}
                case "34" : {return '4'}
                case "35" : {return '5'}
                case "36" : {return '6'}
                case "37" : {return '7'}
                case "38" : {return '8'}
                case "39" : {return '9'}
                case "3A" : {return ':'}
                case "3B" : {return ';'}
                case "3C" : {return '<'}
                case "3D" : {return '='}
                case "3E" : {return '>'}
                case "3F" : {return '?'}
                case "40" : {return '@'}
                case "41" : {return 'A'}
                case "42" : {return 'B'}
                case "43" : {return 'C'}
                case "44" : {return 'D'}
                case "45" : {return 'E'}
                case "46" : {return 'F'}
                case "47" : {return 'G'}
                case "48" : {return 'H'}
                case "49" : {return 'I'}
                case "4A" : {return 'J'}
                case "4B" : {return 'K'}
                case "4C" : {return 'L'}
                case "4D" : {return 'M'}
                case "4E" : {return 'N'}
                case "4F" : {return 'O'}
                case "50" : {return 'P'}
                case "51" : {return 'Q'}
                case "52" : {return 'R'}
                case "53" : {return 'S'}
                case "54" : {return 'T'}
                case "55" : {return 'U'}
                case "56" : {return 'V'}
                case "57" : {return 'W'}
                case "58" : {return 'X'}
                case "59" : {return 'Y'}
                case "5A" : {return 'Z'}
                case "5B" : {return '['}
                case "5C" : {return '\\'}
                case "5D" : {return ']'}
                case "5E" : {return '^'}
                case "5F" : {return '_'}
                case "60" : {return '`'}
                case "61" : {return 'a'}
                case "62" : {return 'b'}
                case "63" : {return 'c'}
                case "64" : {return 'd'}
                case "65" : {return 'e'}
                case "66" : {return 'f'}
                case "67" : {return 'g'}
                case "68" : {return 'h'}
                case "69" : {return 'i'}
                case "6A" : {return 'j'}
                case "6B" : {return 'k'}
                case "6C" : {return 'l'}
                case "6D" : {return 'm'}
                case "6E" : {return 'n'}
                case "6F" : {return 'o'}
                case "70" : {return 'p'}
                case "71" : {return 'q'}
                case "72" : {return 'r'}
                case "73" : {return 's'}
                case "74" : {return 't'}
                case "75" : {return 'u'}
                case "76" : {return 'v'}
                case "77" : {return 'w'}
                case "78" : {return 'x'}
                case "79" : {return 'y'}
                case "7A" : {return 'z'}
                case "7B" : {return '{'}
                case "7C" : {return '|'}
                case "7D" : {return '}'}
                case "7E" : {return '~'}

            }

        }

        public findNextEmptyBlock(): string {

            var spaceFound:boolean = false;

            for (var t = 1; t < 4; t++) {

                for (var s = 0; s < 8; s++) {

                    for (var b = 0; b < 8; b++) {

                        var hddBlock: string = sessionStorage.getItem("" + t + s + b);
                        if (hddBlock.charAt(0) === '0') {
                            spaceFound = true;
                            return "" + t + s + b;
                        }

                    }

                }

            }

            if (!spaceFound)
                return "&&&";

        }

        public findNextEmptyNameBlock(): string {

            var t: string = '0';

            for (var s = 0; s < 8; s++) {

                for (var b = 0; b < 8; b++) {

                    var hddBlock: string = sessionStorage.getItem('' + t + s + b);
                    if (hddBlock.charAt(0) === '0') {
                        console.log("" + t + s + b);
                        return "" + t + s + b;
                    }

                }

            }

            return "&&&";

        }

        public clearOldData(hddLoc: string) {

            var temp: string = sessionStorage.getItem(hddLoc);

            sessionStorage.setItem(hddLoc, temp.substr(0, 4) + '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

        }

    }


}