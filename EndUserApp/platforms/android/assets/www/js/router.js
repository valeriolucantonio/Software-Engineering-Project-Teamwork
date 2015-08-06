define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  //models
  var MyModel = require("models/MyModel");
  var TreeModel = require("models/TreeModel");
  var NodeModel = require("models/NodeModel");
  var SummaryModel = require("models/SummaryModel");
  var EdgeModel = require("models/EdgeModel");
  var CalculationModel = require("models/CalculationModel");
  var InputNodeModel = require("models/InputNodeModel");
  var VariableModel = require("models/VariableModel");
  //collections
  var TreeCollection = require("collections/TreeCollection");
  var NodeCollection= require("collections/NodeCollection");
  var EdgeCollection = require("collections/EdgeCollection");
  var SummaryCollection = require("collections/SummaryCollection");
  var CalculationCollection = require("collections/CalculationCollection");
  var InputNodeCollection = require("collections/InputNodeCollection");
  var VariableCollection = require("collections/VariableCollection");

  //views
  var StructureView = require("views/StructureView");
  var MenuView = require("views/pages/MenuView");
  var SurveyList = require("views/pages/SurveyList");
  var QuestionView = require("views/pages/QuestionView");
  var LanguageView = require("views/pages/LanguageView");
  var SummaryView = require("views/pages/SummaryView");
  var AboutView = require("views/pages/AboutView");
  var ContactView= require("views/pages/ContactView");
  var CalculationView= require("views/pages/CalculationView");
  var InputNodeView= require("views/pages/InputNodeView");
  var ResultCalculationView=require("views/pages/ResultCalculationView");
  
  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "menu":"menu",
      "chooseSurveys": "surveyView",
      "question/:id": "questionView",
      "language/:id": "languageView",
      "rootNode/:language": "goToRootNode",
      "goToNextQuestion/:id":"goToNextQuestion",
      "about":"aboutView",
      "contact":"contactView",
      "prevquestion":"goToPrevQuestion",
      "nextquestion":"nextQuestion",
      "rootInputNode/:id":"goToRootInputNode",
      "inputNode/:id/:ans/:name":"goToInputNode"
    },

    firstView: "menu",
    
    trees:"",
    nodes:"",
    edges:"",
    calculations:"",
    inputnodes:"",

    count:"0",
    tmpCount:"0",
    rootNodeId:"",
    currentNodeId:"",
    economic:"",

    initialize: function(options) {
      //get all the trees from database
      this.treeCollection=new TreeCollection();
      this.treeCollection.getTrees(this.treeCollection);
      this.treeCollection.on("treesReady", this.getTrees, this);

      //get all the nodes from database
      this.nodeCollection=new NodeCollection();
      this.nodeCollection.getNodes(this.nodeCollection);
      this.nodeCollection.on("nodesReady", this.getNodes, this);
    
      //get all the edges from database    
      this.edgeCollection=new EdgeCollection();
      this.edgeCollection.getEdges(this.edgeCollection);
      this.edgeCollection.on("edgesReady", this.getEdges, this);

      //get all the calculations from the database
      this.calculationCollection= new CalculationCollection();
      this.calculationCollection.getCalculations(this.calculationCollection);
      this.calculationCollection.on("calculationsReady",this.getCalculations, this);

      //get all the input nodes from the database
      this.inputNodeCollection= new InputNodeCollection();
      this.inputNodeCollection.getInputNodes(this.inputNodeCollection);
      this.inputNodeCollection.on("inputNodesReady",this.getInputNodes,this);
      
      this.summaryCollection=new SummaryCollection(); 
      this.variableCollection=new VariableCollection();

      
    },

    getTrees: function(trees){
      this.treeModel=new TreeModel();
      this.trees=trees;
    },
    getNodes: function(nodes){
      this.nodeModel=new NodeModel();
      this.nodes=nodes;
    },
    getEdges: function(edges){
      this.edgeModel=new EdgeModel();
      this.edges=edges;
    },
    getCalculations:function(calculations){
      this.calculationModel= new CalculationModel();
      this.calculations=calculations;
    },
    getInputNodes:function(inputnodes){
      this.inputNodeModel=new InputNodeModel();
      this.inputnodes=inputnodes;
      console.log(inputnodes);
    },
    surveyView: function(){
      var page = new SurveyList({model: this.trees});
      this.changePage(page);
    },
    
    menu: function() {
   //   this.structureView.changeTitle("Menu");
      var page = new MenuView();
      this.changePage(page);
    },
    aboutView: function(){
     // this.structureView.changeTitle("About");
      var page= new AboutView();
      this.changePage(page);
    },

    contactView: function (){
     // this.structureView.changeTitle("Contact");
      var page= new ContactView();
      this.changePage(page);
    },

    summaryView: function(){
      //this.structureView.changeTitle("Summary");
      console.log(this.treeModel);
      this.nameOfTheTree=this.treeModel.getTreeName(this.currentTree, this.trees, this.language);
      var page = new SummaryView({ model: this.summaryCollection, nameTree: this.nameOfTheTree});
      page.getPercentage(this.language, this.nodes, this.edges);
      this.changePage(page);
    },

    languageView: function(id){
      var selTree=this.treeModel.getTree(id, this.trees);
      this.currentTree=id;
      var page= new LanguageView({model: selTree });
      this.changePage(page);
    },

    showStructure: function() {
      if (!this.structureView) {
        this.structureView = new StructureView();
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");


      this.navigate(this.menu, {trigger: true});
      }
      // go to first view
      this.navigate(this.menu, {trigger: true});

    },

    questionView: function(id){
      this.currentQuestion= id;
      var page= new QuestionView({model: this});
      this.changePage(page);
    },

    /*
      here the code diverges depending whether the user has selected a regular tree or an economic tree
    */
    goToRootNode: function(language){
      this.language=language;
     
      var rootNode= this.treeModel.getRootNodeId(this.currentTree, this.trees);

      if(rootNode===null){
        // Then we have an economic tree
       console.log("yay");
        this.economic=true;
        console.log("We have an economic treeeeeeeee root node is undefined");
        // Instatiate the view that lets the user choose a type of calculation

        //Check calcs
       var array=this.calculationModel.getCalculationInfo(language,this.calculations);
       console.log(array);
       var page= new CalculationView({model: array});
      this.changePage(page);

      
      }
      else {
       this.questionView(rootNode);
      }

      
    },

    goToPrevQuestion:function(){
       this.tmpCount--;
      var that=this;
       this.summaryCollection.each(function(model, index, list)
    {
      
        if(model.nextId===that.currentNodeId){
           that.currentNodeId=model.question;
        }
    });
       //dead route in order reload the existing route( click previous multiple times in a row )
        this.navigate("bla");
    
     this.questionView(this.currentNodeId);
        
    },
    nextQuestion:function(){
      //alert("count:"+this.count+"tmpCount:"+this.tmpCount);
      if(this.tmpCount<this.count){
         this.tmpCount++;
         var that=this;
         this.summaryCollection.each(function(model, index, list)
        {
             if(model.question===that.currentNodeId){
        that.currentNodeId=model.nextId;
             }
         });

        //dead route in order reload the existing route( click previous multiple times in a row )
        this.navigate("bla");
         this.questionView(this.currentNodeId);
        
      }
    },

    goToNextQuestion: function(answerId){

      var answer=this.edgeModel.getEdge(answerId, this.edges, this.language);
      var summary=new SummaryModel();

      summary.answer=answerId;
      summary.question=answer.belongsTo;
      summary.number=this.count;
      var that=this;
      var countDelete=0;
      var arrayDelete={};

    //  if(this.tmpCount<this.count){
        //then we are editing previous questions
        var b=0;
        //Find the summary item for the question
        this.summaryCollection.each(function(model, index, list)
    {
      if(model.question===answer.belongsTo){
        b=1;
        if(model.answer!=answerId){
          // If the user chooses a different answer add the question in the list of models to remove from the collection
          arrayDelete[countDelete]=model;
          countDelete++;
        }
        else {
          // trying to fix the generic back consequences , if condition can be removed 
          arrayDelete[countDelete]=model;
          countDelete++;
        }
      }
      else {
        if(b==1){
        // b==1 only when a change is detected , so all the next question if any will be marked to be deleted from the collection
        arrayDelete[countDelete]=index;
        countDelete++;
        }
      }


    });
        // delete all items marked by index
        for(var i=0;i<countDelete;i++){

          this.summaryCollection.remove(arrayDelete[i]);
        }

        this.count-=countDelete;


    //  }
      summary.nextId=answer.nextNode;
     
     this.currentNodeId=answer.nextNode;

     // console.log(summary);
     // summary is the new summaryItem given the answer that triggered the change to the next question
   

      this.summaryCollection.add(summary);

      // If next node is summary go to summary
      if(answer.nextNode==="summary"){
        
        this.summaryView();
        //console.log("SUMMARY");
        console.log(answer.objectId);
      }
      else{
        this.questionView(answer.nextNode);}
        this.count++;
        this.tmpCount++;
    },

    /*
      Paran: id of the calcuation that has been selected by the user
      This id is used to retrieve the info for the root input node (the first  input node to present to the user)
    */
    goToRootInputNode: function (id){
        this.calculation=id;
        this.rootInputNode=this.calculationModel.getCalculationRootNode(id, this.calculations);
        var n=this.inputNodeModel.getInputNodeInfo(this.rootInputNode,this.inputnodes,this.language);
        var page= new InputNodeView({model:n});
         this.changePage(page);
        
    },
    /*
      This function saves the input by the user in the variableCollection (used only for calcuations)
      Also if the alst inputnode (variable) is reached, the function cretrives the formula for the selected 
      calcuation and evaluates this formula by creating an array of all the variables entered by the user and 
      used in the formula (extracted form the variable collection) and passes them to the parser.evaulate method
      along with the expression (formula string ) to be evaluated. After that the result is comapred using the 
      operator specified in the calcuation object with a variable entered by  the use (nameOrVal=true, use 
      nameThreshold field) or with a specified value (nameOrVal=false, use valThreshold field). Then the reusult of 
      the comparison is passed to the resultCalcuationView along with the name and the decription of the calcuation 
      in the language sleceted by the user.
    */
    goToInputNode:function(id,ans,name){
       var variable=new VariableModel();
       variable.name=name;
       variable.value=ans;
       this.variableCollection.add(variable);


       if(id!="summary"){
    
       var n=this.inputNodeModel.getInputNodeInfo(id,this.inputnodes,this.language);

       var page= new InputNodeView({model:n});
         this.changePage(page);
       }
       else {
        var formula=this.calculationModel.getFormulaInfo(this.calculation,this.calculations);
        this.formula=formula;
        console.log(formula);

        var obj={};
        this.variableCollection.each(function(model, index, list){
          obj[model.name]=model.value;
        });
        console.log(obj);
        var result=checkEval(formula.formula, obj);
        console.log("result: "+ result);
        var objInfo=this.calculationModel.getCalculationNameDescr(this.calculation, this.calculations, this.language);
        var valCmp="";
        if(formula.nameOrVal==true){
          // it is a variable we have to comapre the result with
          this.variableCollection.each(function(model, index, list){
            if (model.name===formula.nameThreshold){
              //found the name of the variable in the collection to compare our result with , not get value entered by the user
              valCmp=model.value;
            }
          });
        }
        else {
          // it is a given value by the adminsitrator we have to compare the result with
          valCmp=formula.valThreshold;
        }

        console.log(valCmp);

        var finalRes="";

        if(formula.operator==="less"){
          if(result<valCmp){
            finalRes="Positive";
          }
          else{
            finalRes="Negative";
          }
        }
        else if(formula.operator==="more"){
          if(result>valCmp){
            finalRes="Positive";
          }
          else{
            finalRes="Negative";
          }
        }
        else if(formula.operator==="equal"){
          if(result==valCmp){
            finalRes="Positive";
          }
          else{
            finalRes="Negative";
          }
        }
        else {
          console.log("Unknown operator");
        }
       // objInfo["result"]=
       objInfo["result"]=finalRes;
       objInfo["language"]=this.language;

       console.log(objInfo);
       var page= new ResultCalculationView({model:objInfo});
         this.changePage(page);

       }

    }
  });

  return AppRouter;

}); 