export class VirusStatusModel {
  static fromObject(obj) {
    let model = new VirusStatusModel();
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

export class VirusStatusTotalModel {
  static fromObject(obj) {
    let model = new VirusStatusTotalModel();
    model.virusUpdateTime = obj["virusUpdateTime"];
    model.virusList = obj["virusList"];
    return model;
  }

  virusUpdateTime;
  virusList;
}

export class VirusStatusDailyModel {
  static fromObject(obj) {
    let model = new VirusStatusDailyModel();
    model.dailyTotal = obj["dailyTotal"];
    model.dailyNew = obj["dailyNew"];
    return model;
  }

  dailyTotal;
  dailyNew;
}

export class VirusStatusDailyItemModel {
  static fromObject(obj) {
    let model = new VirusStatusDailyItemModel();
    model.dead = obj["dead"];
    model.confirmed = obj["confirmed"];
    model.recoverd = obj["recoverd"];
    return model;
  }

  dead;
  confirmed;
  recoverd;
}

export class VirusStatusDailyNewTickModel {
  static fromObject(obj) {
    let model = new VirusStatusDailyNewTickModel();
    model.id = obj["id"];
    model.isCountry = obj["isCountry"];
    model.type = obj["type"];
    model.area = obj["area"];
    model.date = obj["date"];
    model.count = obj["count"];
    return model;
  }

  id;
  isCountry;
  type; //dead, confirmed, recoverd
  area; //China
  date; //2019-2-1
  count; //10
}

export class VirusStatusDailyTotalTickModel {
  static fromObject(obj) {
    let model = new VirusStatusDailyTotalTickModel();
    model.id = obj["id"];
    model.isCountry = obj["isCountry"];
    model.type = obj["type"];
    model.area = obj["area"];
    model.date = obj["date"];
    model.count = obj["count"];
    return model;
  }

  id;
  isCountry;
  type; //dead, confirmed, recoverd
  area; //China
  date; //2019-2-1
  count; //10
}

export class PoiInfoModel {
  static fromObject(obj) {
    let model = new PoiInfoModel();
    model.id = obj["id"];
    model.lat = obj["lat"];
    model.lon = obj["lon"];
    model.type = obj["type"];
    model.source = obj["source"];
    model.address = obj["address"];
    model.contact = obj["contact"];
    model.ancestral_home = obj["ancestral_home"];
    model.age = obj["age"];
    model.gender = obj["gender"];
    model.symptom = obj["symptom"];
    model.travel_history = obj["travel_history"];
    model.travel_history = obj["travel_history"];
    model.remark = obj["remark"];

    return model;
  }

  id;
  lat;
  lon;
  type; //help,dead,confirm,cured
  source;
  address;
  contact;
  ancestral_home;
  age;
  gender;
  symptom;
  travel_history;
  remark;
}
