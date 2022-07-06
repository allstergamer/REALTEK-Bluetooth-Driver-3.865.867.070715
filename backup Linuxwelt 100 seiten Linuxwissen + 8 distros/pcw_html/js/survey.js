/*
The MIT License (MIT)

Copyright (c) 2015 Egbert Bouman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) 2015 by Michael Vaughan (http://codepen.io/mikalveli/pen/DIioe)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Copyright (c) 2017 by David Wolski (http://rand10.net)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// window.onbeforeunload = function() {
//     return "This will reset all answers that you've already filled in!";
// }

survey = { questions: undefined,
           firstQuestionDisplayed: -1,
           lastQuestionDisplayed: -1};

(function (survey, $) {

    survey.setup_survey = function(questions) {
        var self = this;
        this.questions = questions;

        this.questions.forEach(function(question) {
            self.generateQuestionElement( question );
        });
      
        $('#backBtn').click(function() {
            if ( !$('#backBtn').hasClass('disabled') ) {
                self.showPreviousQuestionSet();
            }
        });
      
        $('#nextBtn').click(function() {
            var ok = true;
            for (i = self.firstQuestionDisplayed; i <= self.lastQuestionDisplayed; i++) {
                if (self.questions[i]['required'] === true && !self.getQuestionAnswer(questions[i])) {
                    $('.question-container > div.question:nth-child(' + (i+1) + ') > .required-message').show();
                    ok = false;
                }
            }
            if (!ok)
                return

            if ( $('#nextBtn').text().indexOf('Continue') === 0 ) {
                self.showNextQuestionSet();
            }
            else {
                var answers = {};
                for (i = 0; i < self.questions.length; i++) {
                    answers[self.questions[i].id] = self.getQuestionAnswer(self.questions[i]);
                }
		self.hideAllQuestions();
		$('#nextBtn').hide();
                $('#backBtn').hide();
		//JSON test:
        //uncomment for debugging:        
        //$('.completed-message').html(JSON.stringify(answers));
		//Processing of answers starts here:
        // [0] Benutzerfreundlich
        // [1] Dokumentation  
        // [2] Aktualität
        // [3] Paketauswahl
        // [4] Server
        // [5] Desktop
        
		//Skills + Desktop
		if (answers.Benutzerfreundlich == "Anfänger." && answers.Rolle == "den Desktop.") {
		    $("#myTable").tablesorter( {sortList: [[0,1], [5,1]]});
		}
		if (answers.Benutzerfreundlich == "Fortgeschritten." && answers.Rolle == "den Desktop.") {
		    $("#myTable").tablesorter( {sortList: [[5,1], [0,1]]});
		}
		if (answers.Benutzerfreundlich == "Chefpinguin." && answers.Rolle == "den Desktop.") {
		    $("#myTable").tablesorter( {sortList: [[1,1], [5,1]]});
		}
		//Skills + Server	
		if (answers.Benutzerfreundlich == "Anfänger." && answers.Rolle == "den Server.") {
		    $("#myTable").tablesorter( {sortList: [[4,1], [0,1]]});
		}		
		if (answers.Benutzerfreundlich == "Fortgeschritten." && answers.Rolle == "den Server.") {
		    $("#myTable").tablesorter( {sortList: [[0,1], [4,1]]});
		}
		if (answers.Benutzerfreundlich == "Chefpinguin." && answers.Rolle == "den Server.") {
		    $("#myTable").tablesorter( {sortList: [[1,1], [4,1]]});
		}		
		//Skills + Viele Pakete + Desktop
		if (answers.Benutzerfreundlich == "Anfänger." && answers.Rolle == "den Desktop." && answers.Pakete == "möglichst viele Pakete bereit stellen.") {
		    $("#myTable").tablesorter( {sortList: [[3,1], [0,1], [5,1]]});
		}
		if (answers.Benutzerfreundlich == "Fortgeschritten." && answers.Rolle == "den Desktop." && answers.Pakete == "möglichst viele Pakete bereit stellen.") {
		    $("#myTable").tablesorter( {sortList: [[3,1], [5,1], [0,1]]});
		}
		if (answers.Benutzerfreundlich == "Chefpinguin." && answers.Rolle == "den Desktop." && answers.Pakete == "möglichst viele Pakete bereit stellen.") {
		    $("#myTable").tablesorter( {sortList: [[3,1], [1,1], [5,1]]});
		}
		//Skills + Viele Pakete + Server
		if (answers.Benutzerfreundlich == "Anfänger." && answers.Rolle == "den Server." && answers.Pakete == "möglichst viele Pakete bereit stellen.") {
		    $("#myTable").tablesorter( {sortList: [[3,1], [4,1], [0,1]]});
		}		
		if (answers.Benutzerfreundlich == "Fortgeschritten." && answers.Rolle == "den Server." && answers.Pakete == "möglichst viele Pakete bereit stellen.") {
		    $("#myTable").tablesorter( {sortList: [[3,1], [0,1], [4,1]]});
		}
		if (answers.Benutzerfreundlich == "Chefpinguin." && answers.Rolle == "den Server." && answers.Pakete == "möglichst viele Pakete bereit stellen.") {
		    $("#myTable").tablesorter( {sortList: [[3,1], [1,1], [4,1]]});
		}				
		//Skills + Aktualität + Viele Pakete + Desktop
		if (answers.Benutzerfreundlich == "Anfänger." && answers.Rolle == "den Desktop." && answers.Pakete == "möglichst viele Pakete bereit stellen." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[0,1], [5,1], [2,1], [3,1]]});
		}
		if (answers.Benutzerfreundlich == "Fortgeschritten." && answers.Rolle == "den Desktop." && answers.Pakete == "möglichst viele Pakete bereit stellen." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[5,1], [0,1], [2,1], [3,1]]});
		}
		if (answers.Benutzerfreundlich == "Chefpinguin." && answers.Rolle == "den Desktop." && answers.Pakete == "möglichst viele Pakete bereit stellen." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[3,1], [5,1], [2,1]]});
		}
		//Skills + Aktualität + Viele Pakete + Server
		if (answers.Benutzerfreundlich == "Anfänger." && answers.Rolle == "den Server." && answers.Pakete == "möglichst viele Pakete bereit stellen." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[4,1], [0,1], [2,1], [3,1]]});
		}		
		if (answers.Benutzerfreundlich == "Fortgeschritten." && answers.Rolle == "den Server." && answers.Pakete == "möglichst viele Pakete bereit stellen." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[0,1], [4,1], [2,1], [3,1]]});
		}
		if (answers.Benutzerfreundlich == "Chefpinguin." && answers.Rolle == "den Server." && answers.Pakete == "möglichst viele Pakete bereit stellen." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[3,1], [4,1], [2,1], [3,1]]});
		}				
		//Skills + Aktualität + Viele Pakete + Desktop
		if (answers.Benutzerfreundlich == "Anfänger." && answers.Rolle == "den Desktop." && answers.Pakete == "möglichst viele Pakete bereit stellen." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[0,1], [5,1], [3,1]]});
		}
		if (answers.Benutzerfreundlich == "Fortgeschritten." && answers.Rolle == "den Desktop." && answers.Pakete == "möglichst viele Pakete bereit stellen." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[2,1], [0,1], [3,1]]});
		}
		if (answers.Benutzerfreundlich == "Chefpinguin." && answers.Rolle == "den Desktop." && answers.Pakete == "möglichst viele Pakete bereit stellen." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[1,1], [5,1], [3,1]]});
		}
		//Skills + Aktualität + Server
		if (answers.Benutzerfreundlich == "Anfänger." && answers.Rolle == "den Server." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[2,1], [0,1], [2,1]]});
		}		
		if (answers.Benutzerfreundlich == "Fortgeschritten." && answers.Rolle == "den Server." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[2,1], [4,1], [2,1]]});
		}
		if (answers.Benutzerfreundlich == "Chefpinguin." && answers.Rolle == "den Server." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[2,1], [4,1], [2,1]]});
		}
		//Skills + Aktualität + Desktop
		if (answers.Benutzerfreundlich == "Anfänger." && answers.Rolle == "den Desktop." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[2,1], [0,1], [2,1]]});
		}		
		if (answers.Benutzerfreundlich == "Fortgeschritten." && answers.Rolle == "den Desktop." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[2,1], [4,1], [2,1]]});
		}
		if (answers.Benutzerfreundlich == "Chefpinguin." && answers.Rolle == "den Desktop." && answers.Aktuell == "besonders aktuell sein.") {
		    $("#myTable").tablesorter( {sortList: [[2,1], [4,1], [2,1]]});
		}		
            $("#myTable").css({"display":"inline"});
            $("#reset").css({"display":"inline"});
            $("#hinweis").css({"display":"none"});
	    $("#intro").css({"display":"none"});
	    $("#results").css({"display":"inline"});
            $("th").css({"display":"none"});
        }
        });
      
        this.showNextQuestionSet();
         
    }

    survey.getQuestionAnswer = function(question) {
        var result;
        if ( question.type === 'single-select' ) {
            result = $('input[type="radio"][name="' + question.id + '"]:checked').val();
        }
        else if ( question.type === 'single-select-oneline' ) {
            result = $('input[type="radio"][name="' + question.id + '"]:checked').val();
        }
        else if ( question.type === 'drop-down' ) {
            result = $('select[name="' + question.id + '"] option:selected').text();
        }
        else if ( question.type === 'text-field-small' ) {
            result = $('input[name=' + question.id + ']').val();
        }
        else if ( question.type === 'text-field-large' ) {
            result = $('textarea[name=' + question.id + ']').val();
        }
        return result ? result : undefined;
    }

    survey.generateQuestionElement = function(question) {
        var questionElement = $('<div id="' + question.id + '" class="question"></div>');
        var questionTextElement = $('<div class="question-text"></div>');
        var questionAnswerElement = $('<div class="answer"></div>');
        var questionCommentElement = $('<div class="comment"></div>');
        questionElement.appendTo($('.question-container'));
        questionElement.append(questionTextElement);
        questionElement.append(questionAnswerElement);
        questionElement.append(questionCommentElement);
        questionTextElement.html(question.text);
        questionCommentElement.html(question.comment);
        if ( question.type === 'single-select' ) {
            questionElement.addClass('single-select');
            question.options.forEach(function(option) {
                questionAnswerElement.append('<label class="radio"><input class="pcw_choices" type="radio" value="' + option + '" name="' + question.id + '"/>' + option + '</label>');
            });
        }
        else if ( question.type === 'single-select-oneline' ) {
            questionElement.addClass('single-select-oneline');
            var html = '<table border="0" cellpadding="5" cellspacing="0"><tr><td></td>';
            question.options.forEach(function(label) {
                html += '<td><label>' + label + '</label></td>';
            });
            html += '<td></td></tr><tr><td><div>' + question.labels[0] + '</div></td>';
            question.options.forEach(function(label) {
                html += '<td><div><input type="radio" value="' + label + '" name="' + question.id + '"></div></td>';
            });
            html += '<td><div>' + question.labels[1] + '</div></td></tr></table>';
            questionAnswerElement.append(html);
        }
        else if ( question.type === 'drop-down' ) {
            questionElement.addClass('drop-down');
            var html = '<select name="' + question.id + '"><option selected="selected"></option>';
            question.options.forEach(function(option) {
                html += '<option>' + option + '</option>';
            });
            html += '</select>';
            questionAnswerElement.append(html);
        }
        else if ( question.type === 'text-field-small' ) {
            questionElement.addClass('text-field-small');
            questionAnswerElement.append('<input type="text" value="" class="text" name="' + question.id + '">');
        }
        else if ( question.type === 'text-field-large' ) {
            questionElement.addClass('text-field-large');
            questionAnswerElement.append('<textarea rows="8" cols="0" class="text" name="' + question.id + '">');
        }
        if ( question.required === true ) {
            var last = questionTextElement.find(':last');
            (last.length ? last : questionTextElement).append('<span class="required-asterisk" aria-hidden="true">*</span>');
        }
        questionAnswerElement.after('<div class="required-message">Dies ist ein Pflichtfeld.</div>');
        questionElement.hide();
    }

    survey.hideAllQuestions = function() {
        $('.question:visible').each(function(index, element){
            $(element).hide();
        });
        $('.required-message').each(function(index, element){
            $(element).hide();
        });
    }

    survey.showNextQuestionSet = function() {
        this.hideAllQuestions();
        this.firstQuestionDisplayed = this.lastQuestionDisplayed+1;
      
        do {
            this.lastQuestionDisplayed++;  
            $('.question-container > div.question:nth-child(' + (this.lastQuestionDisplayed+1) + ')').show();
            if ( this.questions[this.lastQuestionDisplayed]['break_after'] === true)
                break;
        } while ( this.lastQuestionDisplayed < this.questions.length-1 );
      
        this.doButtonStates();
    }

    survey.showPreviousQuestionSet = function() {
        this.hideAllQuestions();
        this.lastQuestionDisplayed = this.firstQuestionDisplayed-1;
      
        do {
            this.firstQuestionDisplayed--;  
            $('.question-container > div.question:nth-child(' + (this.firstQuestionDisplayed+1) + ')').show();
            if ( this.firstQuestionDisplayed > 0 && this.questions[this.firstQuestionDisplayed-1]['break_after'] === true)
                break;
        } while ( this.firstQuestionDisplayed > 0 );
      
        this.doButtonStates();
    }

    survey.doButtonStates = function() {
        if ( this.firstQuestionDisplayed == 0 ) {
            $('#backBtn').addClass('invisible');  
        }
        else if ( $('#backBtn' ).hasClass('invisible') ) {
            $('#backBtn').removeClass('invisible');
        }
        
        if ( this.lastQuestionDisplayed == this.questions.length-1 ) {
            $('#nextBtn').text('Auswerten');
            $('#nextBtn').addClass('blue');  
        }
        else if ( $('#nextBtn').text() === 'Finish' ) {
            $('#nextBtn').text('Continue »'); 
            $('#nextBtn').removeClass('blue');
        }
    }
})(survey, jQuery);


$(document).ready(function(){
      json = [{"text":"Als Linux-Anwender sind Sie...","id":"Benutzerfreundlich","required":true,"type":"single-select","options":["Anfänger.","Fortgeschritten.","Chefpinguin."]},{"text":"Sie suchen eine Linux-Distribution für","id":"Rolle","required":true,"type":"single-select","options":["den Server.","den Desktop."]},{"text":"Die Linux-Distribution soll...","id":"Pakete","type":"single-select","options":["möglichst viele Pakete bereit stellen.","weniger, dafür gut getestete Pakete haben."]},{"text":"Die bereitgestellter Software soll...","id":"Aktuell","type":"single-select","options":["besonders aktuell sein.","eher stabil sein."]}];
       //alert(JSON.stringify(json));
        survey.setup_survey(json);        
});
