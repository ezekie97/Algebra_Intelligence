var showRatings = function(){
  var htmlString = "<h2>";
  htmlString+= "Quadratic Root Skill: " + getCookie("quadraticSkill") + "</h2>";
  htmlString += "<h2>";
  htmlString+= "Evaluating Expressions (Addition) Skill: " + getCookie("evalAddSkill") + "</h2>";
  htmlString += "<h2>";
  htmlString+= "Evaluating Expressions (Subtraction) Skill: " + getCookie("evalSubSkill") + "</h2>";
  htmlString += "<h2>";
  htmlString+= "Solving Linear Equations Skill: " + getCookie("linearEqSkill") + "</h2>";
  htmlString += "<h2>";
  return htmlString;
};
