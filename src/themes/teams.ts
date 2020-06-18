import BuckinghamshireLogo from "./logos/Buckinghamshire.svg";
import CamdenLogo from "./logos/Camden.svg";
import CanterburyLogo from "./logos/Canterbury.svg";
import LambethLogo from "./logos/Lambeth.svg";
import LewishamLogo from "./logos/Lewisham.svg";
import NorthumberlandLogo from "./logos/Northumberland.svg";
import ScotlandLogo from "./logos/Scotland.svg";
import SouthwarkLogo from "./logos/Southwark.svg";

const teams = {
  southwark: {
    name: "Southwark",
    logo: SouthwarkLogo,
    theme: {
      primary: "#256f8a"
    }
  },
  lambeth: {
    name: "Lambeth",
    logo: LambethLogo,
    theme: {
      primary: "#0a6e6b"
    }
  },
  canterbury: {
    name: "Canterbury",
    logo: CanterburyLogo,
    theme: {
      primary: "#380b37"
    }
  },
  buckinghamshire: {
    name: "Buckinghamshire",
    logo: BuckinghamshireLogo,
    theme: {
      primary: "#2b2d84"
    }
  },
  camden: {
    name: "Camden",
    logo: CamdenLogo,
    theme: {
      primary: "#2b2828"
    }
  },
  northumberland: {
    name: "Northumberland",
    logo: NorthumberlandLogo,
    theme: {
      primary: "#0b2559"
    }
  },
  lewisham: {
    name: "Lewisham",
    logo: LewishamLogo,
    theme: {
      primary: "#2c4972"
    }
  },
  scotland: {
    name: "Scotland",
    logo: ScotlandLogo,
    theme: {
      primary: "#0165bd"
    }
  }
};

export default teamName => teams[teamName];
