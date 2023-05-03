import aaaCooperTransportation from '$lib/shippingCompanySelector/shippingCompanies/AAA Cooper Transportation.png'
import abfFreight from '$lib/shippingCompanySelector/shippingCompanies/ABF Freight.png'
import aciMotorFreight from '$lib/shippingCompanySelector/shippingCompanies/ACi Motor Freight.png'
import daylightTransport from '$lib/shippingCompanySelector/shippingCompanies/Daylight Transport.png'
import estes from '$lib/shippingCompanySelector/shippingCompanies/ESTES.png'
import fedexExpress from '$lib/shippingCompanySelector/shippingCompanies/FedEx Express.jpg'
import fedexFreight from '$lib/shippingCompanySelector/shippingCompanies/FedEx Freight.png'
import fedexGround from '$lib/shippingCompanySelector/shippingCompanies/Fedex Ground.png'
import forwardAir from '$lib/shippingCompanySelector/shippingCompanies/Forward Air.jpg'
import jbHunt from '$lib/shippingCompanySelector/shippingCompanies/JB Hunt.png'
import mainfreight from '$lib/shippingCompanySelector/shippingCompanies/Mainfreight.png'
import oldDominionFreightLine from '$lib/shippingCompanySelector/shippingCompanies/Old Dominion Freight Line.png'
import rAndLCarriers from '$lib/shippingCompanySelector/shippingCompanies/R and L Carriers.png'
import roadrunner from '$lib/shippingCompanySelector/shippingCompanies/Roadrunner.jpg'
import saia from '$lib/shippingCompanySelector/shippingCompanies/SAIA.png'
import schneider from '$lib/shippingCompanySelector/shippingCompanies/Schneider.png'
import sefl from '$lib/shippingCompanySelector/shippingCompanies/SEFL.png'
import smtl from '$lib/shippingCompanySelector/shippingCompanies/SMTL.png'
import tforceFreight from '$lib/shippingCompanySelector/shippingCompanies/TForce Freight.png'
import ups from '$lib/shippingCompanySelector/shippingCompanies/UPS.png'
import xpoLogistics from '$lib/shippingCompanySelector/shippingCompanies/XPO Logistics.jpg'
import xpressGlobalSystems from '$lib/shippingCompanySelector/shippingCompanies/XPress Global Systems.jpg'
import yrcFreight from '$lib/shippingCompanySelector/shippingCompanies/YRC Freight.png'

interface ShippingCompanyPrototype {
  image: string;
  company: string;
}

interface ShippingCompany extends ShippingCompanyPrototype {
  id: number;
}

const shippingCompaniesPrototype: ShippingCompanyPrototype[] = [
  {
    image: aaaCooperTransportation,
    company: 'AAA Cooper Transportation',
  },
  {
    image: abfFreight,
    company: 'ABF Freight',
  },
  {
    image: aciMotorFreight,
    company: 'ACi Motor Freight',
  },
  {
    image: daylightTransport,
    company: 'Daylight Transport',
  },
  {
    image: estes,
    company: 'ESTES',
  },
  {
    image: fedexExpress,
    company: 'FedEx Express',
  },
  {
    image: fedexFreight,
    company: 'FedEx Freight',
  },
  {
    image: fedexGround,
    company: 'Fedex Ground',
  },
  {
    image: forwardAir,
    company: 'Forward Air',
  },
  {
    image: jbHunt,
    company: 'J.B. Hunt',
  },
  {
    image: mainfreight,
    company: 'Mainfreight',
  },
  {
    image: oldDominionFreightLine,
    company: 'Old Dominion Freight Line',
  },
  {
    image: rAndLCarriers,
    company: 'R and L Carriers',
  },
  {
    image: roadrunner,
    company: 'Roadrunner',
  },
  {
    image: saia,
    company: 'SAIA',
  },
  {
    image: schneider,
    company: 'Schneider',
  },
  {
    image: sefl,
    company: 'SEFL',
  },
  {
    image: smtl,
    company: 'SMTL',
  },
  {
    image: tforceFreight,
    company: 'TForce Freight',
  },
  {
    image: ups,
    company: 'UPS',
  },
  {
    image: xpoLogistics,
    company: 'XPO Logistics',
  },
  {
    image: xpressGlobalSystems,
    company: 'XPress Global Systems',
  },
  {
    image: yrcFreight,
    company: 'YRC Freight',
  },
]

function addIds(shippingCompanies: ShippingCompanyPrototype[]): ShippingCompany[] {
  return shippingCompanies.map((company, index) => {
    return { id: index, ...company };
  });
}

export const shippingCompanies: ShippingCompany[] = addIds(shippingCompaniesPrototype);

