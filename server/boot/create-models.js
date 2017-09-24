'use strict'
var async = require('async');
module.exports = function(app) {
  //data source
  var mongoDs = app.dataSources.curativoremoto; // 'name' of your mongo connector, you can find it in datasource.json
 
  //create todos os modelos
  async.parallel({
    lesao: async.apply(criarLesao),
    materiais: async.apply(criarMateriais),
    usuarios: async.apply(criarUsuarios)
    
  }, function(err, results) {
    if (err) throw err;
    criarCurativos(results.lesao, results.materiais, results.usuarios, function(err) {
      console.log('> models created sucessfully');
    });
  });
  //criação das Lesões
  function criarLesao(cb) {
    mongoDs.automigrate('Lesao', function(err) {
      if (err) return cb(err);
      var Lesao = app.models.Lesao;
      Lesao.create([
      {tipo: 'Lesão por pressão',}, 
      {tipo: 'Lesão por fricção',}, 
      {tipo: 'Dermatite Associada à Incontinência(DAI)',}, 
      {
        tipo: 'Úlcera pé diabético',
      }, {
        tipo: 'Úlcera venosa',
      }, {
        tipo: 'Úlcera arterial',
      }, {
        tipo: 'Úlcera mista',
      }, {
        tipo: 'Queimadura',
      }, {
        tipo: 'Deiscência de ferida operatória',
      }, {
        tipo: 'Ferida neoplásica',
      }], cb);
    });
  }


  //criacao de Materiais
  function criarMateriais(cb) {
    mongoDs.automigrate('Materiais', function(err) {
      if (err) return cb(err);
      var Materiais = app.models.Materiais;
      Materiais.create([
        {limpeza: 'S.F. 0,9% (100ML)',},
        {limpeza:'Clorexidina Degermante',},
        {limpeza:'Solução de PHMB Poli-Hexametilino de Biguanida Gaze',},      
        {limpeza:'S.F. 0,9% + Clor. degermante 2%',},
        {limpeza:'Prontosan Solução sem enxágue',},
        {limpeza:'Acticoat'},
        {aplicacao:'Prontosan Solução sem enxágue',},
        {aplicacao:'S.F. 0,9% (100ML)',},
        {aplicacao:'Curatec Petrolatum',},
        {aplicacao:'Atrauman AG Petrolatum Ag',},
        {aplicacao:'Pielsana Sachê Melaleuca',},
        {aplicacao:'Adaptic Touch',},
        {aplicacao:'Hipergel',},
        {aplicacao:'Hidrocoloide - Curatec',},
        {aplicacao:'Duoderm Gel',},
        {aplicacao:'Tegaderme',},
        {oclusao:'Tegaderme + gaze',},
        {oclusao:'Tegaderme',},
        {oclusao:'Biatain Silicone',},
        {oclusao:'Allevyn Gentle Border',},
        {oclusao:'Permafoan Confort',},
        {fixacao:'Gaze Estéril',},
        {fixacao:'Mepilex 20x20 cm',},
        {fixacao:'Mepilex Ag® 20cmx20cm',},
        {fixacao:'Mepilex Border® 15x20 cm',},
        {fixacao:'Clorexidina degermante + S.F. 0,9%'},
        {fixacao:'Medipore',
        
      }], cb);
    });
  }
  function criarUsuarios(cb) {
    mongoDs.automigrate('Usuario', function(err) {
      if (err) return cb(err);
      var Usuario = app.models.Usuario;
      Usuario.create([{
        email: 'admin@hospital.com',
        password: 'hospital'
      }, {
        email: 'teste@hospital.com',
        password: 'teste'
      }], cb);
    });
  }
  function criarCurativos(lesao,materiais,usuarios, cb){
    mongoDs.automigrate('Curativo', function(err) {
      if (err) return cb(err);
      var Curativo = app.models.Curativo;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

      Curativo.create([{
        nomePaciente:'Joao',
        data: Date.now() - (DAY_IN_MILLISECONDS * 4),
        tipoDeLesao: lesao[0].tipo,
        limpeza: materiais[0].limpeza,
        aplicacao: materiais[6].aplicacao,
        oclusao: materiais[16].oclusao,
        fixacao: materiais[21].fixacao,
        frequencia:'2 em 2 horas',
        usuarioId: usuarios[0].id
      }], cb);
    });
  }

};