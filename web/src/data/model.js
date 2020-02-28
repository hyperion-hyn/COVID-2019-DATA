export class VirusStatusModel {
  static fromObject(obj) {
    let model = VirusStatusModel();
    model.id = obj["id"];
    model.isCountry = obj["isCountry"];
    model.area = obj["area"];
    model.newConfirmed = obj["newConfirmed"];
    model.newRecovered = obj["newRecovered"];
    model.newDead = obj["newDead"];
    model.totalConfirmed = obj["totalConfirmed"];
    model.totalRecovered = obj["totalRecovered"];
    model.totalDead = obj["totalDead"];
    return model;
  }

  id;
  isCountry;
  area;
  newConfirmed;
  newRecovered;
  newDead;
  totalConfirmed;
  totalRecovered;
  totalDead;
}

export class VirusStatusDateNewTickModel {
  static fromObject(obj) {
    let model = VirusStatusDateNewTickModel();
    model.id = obj["id"];
    model.isCountry = obj["isCountry"];
    model.type = obj["type"];
    model.area = obj["area"];
    model.date = obj["date"];
    model.count = obj["count"];
  }

  id;
  isCountry;
  type; //dead, confirmed, recoverd
  area; //China
  date; //2019-2-1
  count; //10
}

export class VirusStatusDateTotalTickModel {
  static fromObject(obj) {
    let model = VirusStatusDateTotalTickModel();
    model.id = obj["id"];
    model.isCountry = obj["isCountry"];
    model.type = obj["type"];
    model.area = obj["area"];
    model.date = obj["date"];
    model.count = obj["count"];
  }

  id;
  isCountry;
  type; //dead, confirmed, recoverd
  area; //China
  date; //2019-2-1
  count; //10
}