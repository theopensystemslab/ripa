const planningPermissionFlags = {
  MISSING_INFO: {
    priority: 6,
    id: "MISSING_INFO",
    name: "Missing information",
    icon: "check",
    color: "lightgrey",
    safeColor: "blue",
    description:
      "Before your project can be assessed, there is some key information you’ll need to find out. If you do not know this information, your council may be able to help you find it out."
  },
  LIKELY_FAIL: {
    priority: 5,
    id: "LIKELY_FAIL",
    name: "Likely refusal",
    icon: "warning",
    color: "red",
    safeColor: "red",
    description:
      "Your project will require planning permission. Based on the information you have provided so far, it does not comply with local planning policies and guidance and is therefore quite likely to be refused, except in unusual circumstances."
  },
  EDGE_CASE: {
    priority: 4,
    id: "EDGE_CASE",
    name: "Advice recommended",
    icon: "info",
    color: "orange",
    safeColor: "orange",
    description:
      "Your project will require planning permission. In order for it to be given planning approval, it will have to address certain key issues. We recommend a pre-application meeting to discuss this further with a planning officer, however if you prefer, you can submit a planning application without seeking further advice."
  },
  LIKELY_PASS: {
    priority: 3,
    id: "LIKELY_PASS",
    name: "Likely approval",
    icon: "info",
    color: "green",
    safeColor: "green",
    description:
      "Your project will require planning permission. Based on the information you have provided so far, it appears to comply with local planning policies and guidance, so your application stands a better chance of being approved."
  },
  PLANNING_PERMISSION_REQUIRED: {
    priority: 2.5,
    id: "PLANNING_PERMISSION_REQUIRED",
    name: "Planning permission required",
    icon: "info",
    color: "black",
    safeColor: "black",
    description:
      "Based on the information you have provided, your project appears to require planning permission. You should submit a planning application, however we recommend a pre-application meeting to discuss this further with a planning officer."
  },
  PRIOR_APPROVAL: {
    priority: 2,
    id: "PRIOR_APPROVAL",
    name: "Prior approval required",
    icon: "info",
    color: "#888",
    safeColor: "yellow",
    description:
      "Based on the information you have provided, your project should fall into the category of prior approval. This means you would not require planning permission provided your planning authority does not raise any objections – often this will be established by consulting with your neighbours. If any objections are raised, your planning authority will determine whether those objections are reasonable."
  },
  NO_APP_REQUIRED: {
    priority: 1,
    id: "NO_APP_REQUIRED",
    name: "Permitted development",
    icon: "check",
    color: "grey",
    safeColor: "blue",
    description:
      "Based on the information you have provided your project falls into the category of ‘permitted development’. This means you do not need planning permission to proceed. However, you may want to get a ‘certificate of lawful development’ to provide you and future buyers with legal security."
  }
};

const listedBuildingNamespace = `LB-`;

const listedBuildingFlagIds = {
  LIKELY_REFUSAL: `${listedBuildingNamespace}LIKELY_REFUSAL`,
  ADVICE_RECOMMENDED: `${listedBuildingNamespace}ADVICE_RECOMMENDED`,
  LIKELY_APPROVAL: `${listedBuildingNamespace}LIKELY_APPROVAL`,
  DE_MINIMIS: `${listedBuildingNamespace}DE_MINIMIS`
};

const listedBuildingFlags = {
  [listedBuildingFlagIds.LIKELY_REFUSAL]: {
    priority: 4,
    id: listedBuildingFlagIds.LIKELY_REFUSAL,
    name: "Likely refusal",
    icon: "warning",
    color: "mediumpurple",
    description: `Your project will require Listed Building Consent. There is no fee for this, however, you could be committing a criminal offence if you proceed with any works without it.
    \n Based on the information you have provided, it seems unlikely that Listed Building Consent could be given for your project.`
  },
  [listedBuildingFlagIds.ADVICE_RECOMMENDED]: {
    priority: 3,
    id: listedBuildingFlagIds.ADVICE_RECOMMENDED,
    name: "Advice recommended",
    icon: "check",
    color: "plum",
    description: `Your project will require Listed Building Consent. There is no fee for this, however, you could be committing a criminal offence if you proceed with any works without it.`
  },
  [listedBuildingFlagIds.LIKELY_APPROVAL]: {
    priority: 2,
    id: listedBuildingFlagIds.LIKELY_APPROVAL,
    name: "Likely approval",
    icon: "check",
    color: "steelblue",
    description: `Your project will require Listed Building Consent. Based on the information you have provided so far it seems to comply with policy and guidance, so stands a better chance of being approved.
    \n There is no fee for this, however, you could be committing a criminal offence if you proceed with any works without it.`
  },
  [listedBuildingFlagIds.DE_MINIMIS]: {
    priority: 1,
    id: listedBuildingFlagIds.DE_MINIMIS,
    name: "De minimis",
    icon: "check",
    color: "lightsteelblue",
    description: `Because the property is listed, most works would require listed building consent.
      \n However, based on the information you have provided your project falls into the category of ‘de minimis’ works, meaning it will not have any material impact on the historic fabric or character of the building.
      \n You may want to get a ‘certificate of lawful works to a listed building’ to provide you and future buyers with legal security.
      \n It is a criminal offence to damage a listed building. If at any time during the project you consider there may be a risk of doing so, please consult your local planning authority.
    `
  }
};

export const allFlags = {
  ...planningPermissionFlags,
  ...listedBuildingFlags
};

export default {
  planningPermissionFlags,
  listedBuildingFlags
};
