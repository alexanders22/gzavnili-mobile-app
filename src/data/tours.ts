// Guided tours the assistant can play (ported from the original app). The overlay that
// highlights targets is not rebuilt yet; the list already drives the assistant's menu.
export type TourStep = { route?: string; target: string; press?: boolean; optional?: boolean; say: { en: string; ka: string }; fallback?: { en: string; ka: string } };
export type Tour = { id: string; icon: string; title: { en: string; ka: string }; blurb: { en: string; ka: string }; steps: TourStep[] };

const FIRST_STEP: TourStep = {
        route: "/parcels",
        target: "parcels.dir.in",
        press: true,
        say: {
          en: "Parcels coming to Georgia are under Incoming.",
          ka: "საქართველოში მომავალი ამანათები — „მიღება“ ჩანართში.",
        },
      };
    export const TOURS: Tour[] = [
        {
          id: "add-parcel",
          icon: "add-circle-outline",
          title: {
            en: "Add a parcel",
            ka: "ამანათის დამატება",
          },
          blurb: {
            en: "Tracking code, delivery choice, done",
            ka: "თრექინგ კოდი, მიწოდება, მზადაა",
          },
          steps: [
      FIRST_STEP,
            {
              target: "parcels.add",
              press: true,
              say: {
                en: "Tap “Add tracking” to add a new parcel.",
                ka: "დააჭირე „თრექინგი“ ახალი ამანათის დასამატებლად.",
              },
            },
            {
              target: "incoming.demo",
              press: true,
              say: {
                en: "Paste the tracking code from the store. Here we fill in a demo one.",
                ka: "ჩასვი მაღაზიის თრექინგ კოდი. აქ სადემონსტრაციო კოდს ვიყენებთ.",
              },
            },
            {
              target: "incoming.courier",
              say: {
                en: "Choose a courier to your door, or pick it up at a branch for free.",
                ka: "აირჩიე კურიერი კარამდე ან უფასო გატანა ფილიალიდან.",
              },
            },
            {
              target: "incoming.submit",
              press: true,
              say: {
                en: "Add the parcel. You follow every stage in Parcels.",
                ka: "დაამატე ამანათი — ყველა ეტაპს „ამანათებში“ ნახავ.",
              },
            },
            {
              target: "incoming.done",
              say: {
                en: "Done! Next, declare what is inside so customs does not hold it up.",
                ka: "მზადაა! შემდეგ შეავსე დეკლარაცია, რომ საბაჟოზე არ შეჩერდეს.",
              },
            },
          ],
        },
        {
          id: "declare",
          icon: "document-text-outline",
          title: {
            en: "Declare a parcel",
            ka: "დეკლარირება",
          },
          blurb: {
            en: "Store, products and prices",
            ka: "მაღაზია, პროდუქტები, ფასები",
          },
          steps: [
      FIRST_STEP,
            {
              target: "parcels.status.AWAITING",
              press: true,
              say: {
                en: "Open the parcels on their way to the warehouse.",
                ka: "გახსენი მოსალოდნელი ამანათები.",
              },
            },
            {
              target: "parcels.declare",
              press: true,
              say: {
                en: "Tap Declare on a parcel.",
                ka: "დააჭირე „დეკლარირება“ ამანათზე.",
              },
              fallback: {
                en: "You have no parcels to declare right now — add one first.",
                ka: "ახლა დეკლარირებადი ამანათი არ გაქვს — ჯერ დაამატე.",
              },
            },
            {
              target: "declare.website",
              say: {
                en: "Choose the store you bought from.",
                ka: "აირჩიე მაღაზია, საიდანაც იყიდე.",
              },
            },
            {
              target: "declare.product",
              optional: true,
              say: {
                en: "Add each product with its category and the price from the invoice.",
                ka: "დაამატე თითო პროდუქტი — კატეგორია და ფასი ინვოისიდან.",
              },
            },
            {
              target: "declare.submit",
              say: {
                en: "Declare the parcel. Items worth over ₾300 go through customs.",
                ka: "დეკლარირე ამანათი. ₾300-ზე ძვირი ნივთები საბაჟოს გაივლის.",
              },
              fallback: {
                en: "This parcel is already declared — nothing more to do.",
                ka: "ეს ამანათი უკვე დეკლარირებულია.",
              },
            },
          ],
        },
        {
          id: "pay",
          icon: "card-outline",
          title: {
            en: "Pay for a parcel",
            ka: "გადახდა",
          },
          blurb: {
            en: "Address, card and the total",
            ka: "მისამართი, ბარათი, ჯამი",
          },
          steps: [
      FIRST_STEP,
            {
              target: "parcels.status.RECEIVED_IN_TBILISI_WAREHOUSE",
              press: true,
              say: {
                en: "Parcels that reached Tbilisi are under Arrived.",
                ka: "თბილისში ჩამოსული ამანათები — „ჩამოსული“ ჩანართში.",
              },
            },
            {
              target: "parcels.pay",
              press: true,
              say: {
                en: "When a parcel is ready, a Pay button appears. Tap it.",
                ka: "როცა ამანათი მზადაა, ჩნდება „გადახდა“ ღილაკი.",
              },
              fallback: {
                en: "No parcel is waiting for payment right now. It shows up here once customs is cleared.",
                ka: "ახლა გადასახდელი ამანათი არ გაქვს. ის აქ გამოჩნდება განბაჟების შემდეგ.",
              },
            },
            {
              target: "pay.address",
              say: {
                en: "Choose where the courier should bring it.",
                ka: "აირჩიე, სად მოიტანოს კურიერმა.",
              },
            },
            {
              target: "pay.card",
              say: {
                en: "Pick a saved card.",
                ka: "აირჩიე შენახული ბარათი.",
              },
            },
            {
              target: "pay.total",
              say: {
                en: "The server calculates the total: freight, delivery, customs and service.",
                ka: "ჯამს სერვერი ითვლის: ტრანსპორტი, მიწოდება, საბაჟო და მომსახურება.",
              },
            },
            {
              target: "pay.submit",
              say: {
                en: "Tap Pay to finish, then book a delivery time.",
                ka: "დააჭირე „გადახდა“, შემდეგ აირჩიე მიწოდების დრო.",
              },
            },
          ],
        },
        {
          id: "courier",
          icon: "bicycle-outline",
          title: {
            en: "Order a courier",
            ka: "კურიერის შეკვეთა",
          },
          blurb: {
            en: "Door delivery or branch pickup",
            ka: "კარამდე ან ფილიალიდან",
          },
          steps: [
      FIRST_STEP,
            {
              target: "parcels.status.RECEIVED_IN_TBILISI_WAREHOUSE",
              press: true,
              say: {
                en: "Open the parcels that arrived in Tbilisi.",
                ka: "გახსენი თბილისში ჩამოსული ამანათები.",
              },
            },
            {
              target: "parcels.delivery",
              press: true,
              say: {
                en: "Once a parcel is paid, tap Delivery.",
                ka: "გადახდის შემდეგ დააჭირე „მიწოდება“.",
              },
              fallback: {
                en: "Delivery unlocks after payment. You can also choose courier delivery when you add a parcel.",
                ka: "მიწოდება გადახდის შემდეგ ჩაირთვება. კურიერი ამანათის დამატებისასაც აირჩევა.",
              },
            },
            {
              target: "delivery.mode",
              optional: true,
              say: {
                en: "Courier to your door, or pick it up at a branch.",
                ka: "კურიერი კარამდე ან გატანა ფილიალიდან.",
              },
            },
            {
              target: "delivery.day",
              optional: true,
              say: {
                en: "Pick today or tomorrow.",
                ka: "აირჩიე დღეს ან ხვალ.",
              },
            },
            {
              target: "delivery.slot",
              press: true,
              optional: true,
              say: {
                en: "Choose a time slot.",
                ka: "აირჩიე დრო.",
              },
            },
            {
              target: "delivery.submit",
              say: {
                en: "Book the courier — you get an SMS when they are on the way.",
                ka: "დაჯავშნე კურიერი — SMS მიიღებ, როცა გზაში იქნება.",
              },
              fallback: {
                en: "This parcel already has a delivery booked.",
                ka: "ამ ამანათზე მიწოდება უკვე დაჯავშნილია.",
              },
            },
          ],
        },
        {
          id: "send",
          icon: "paper-plane-outline",
          title: {
            en: "Send a parcel abroad",
            ka: "გაგზავნა საზღვარგარეთ",
          },
          blurb: {
            en: "Pickup, recipients, price",
            ka: "კურიერი, მიმღებები, ფასი",
          },
          steps: [
            {
              route: "/parcels",
              target: "parcels.dir.out",
              press: true,
              say: {
                en: "Sending from Georgia is under Outgoing.",
                ka: "საქართველოდან გაგზავნა — „გაგზავნა“ ჩანართში.",
              },
            },
            {
              target: "parcels.add",
              press: true,
              say: {
                en: "Tap “Send parcel”.",
                ka: "დააჭირე „გაგზავნა“.",
              },
            },
            {
              target: "outgoing.country.DE",
              press: true,
              say: {
                en: "Start with where it goes — price per kg and days are shown.",
                ka: "დაიწყე დანიშნულებით — ფასი და ვადა ჩანს.",
              },
            },
            {
              target: "outgoing.demoRecipient",
              press: true,
              say: {
                en: "Fill in the recipient. Here we use a demo one.",
                ka: "შეავსე მიმღები — აქ სადემონსტრაციო.",
              },
            },
            {
              target: "outgoing.contacts",
              say: {
                en: "Or sync your phone contacts and pick someone.",
                ka: "ან სინქრონიზირე კონტაქტები და აირჩიე.",
              },
            },
            {
              target: "outgoing.people",
              say: {
                en: "Add more people who can accept the parcel. Each gets a profile.",
                ka: "დაამატე სხვა მიმღებები — თითოეულს პროფილი შეიქმნება.",
              },
            },
            {
              target: "outgoing.next",
              press: true,
              say: {
                en: "Continue.",
                ka: "გაგრძელება.",
              },
            },
            {
              target: "outgoing.pickup",
              say: {
                en: "Now where it leaves from: a saved address, or a new one on the map.",
                ka: "ახლა საიდან: შენახული მისამართი ან ახალი რუკაზე.",
              },
            },
            {
              target: "outgoing.next",
              press: true,
              say: {
                en: "Continue to the parcel.",
                ka: "გადადი ამანათზე.",
              },
            },
            {
              target: "outgoing.weight",
              say: {
                en: "Enter the weight and what is inside.",
                ka: "მიუთითე წონა და შიგთავსი.",
              },
            },
            {
              target: "outgoing.next",
              press: true,
              say: {
                en: "See the price.",
                ka: "ნახე ფასი.",
              },
            },
            {
              target: "outgoing.submit",
              say: {
                en: "Check the price and create the shipment.",
                ka: "გადაამოწმე ფასი და შექმენი გზავნილი.",
              },
            },
          ],
        },
        {
          id: "calculator",
          icon: "calculator-outline",
          title: {
            en: "What will it cost",
            ka: "რა ღირს",
          },
          blurb: {
            en: "Weight, courier and customs",
            ka: "წონა, კურიერი, საბაჟო",
          },
          steps: [
            {
              route: "/parcels",
              target: "parcels.price",
              press: true,
              say: {
                en: "Tap Price to open the calculator.",
                ka: "დააჭირე „ფასი“ — გაიხსნება კალკულატორი.",
              },
            },
            {
              target: "calc.dir",
              say: {
                en: "Choose whether you receive a parcel or send one.",
                ka: "აირჩიე მიღება ან გაგზავნა.",
              },
            },
            {
              target: "calc.route",
              say: {
                en: "Pick the route.",
                ka: "აირჩიე მარშრუტი.",
              },
            },
            {
              target: "calc.weight.5",
              press: true,
              say: {
                en: "Set the weight — here 5 kg.",
                ka: "მიუთითე წონა — მაგ. 5 კგ.",
              },
            },
            {
              target: "calc.delivery",
              say: {
                en: "Courier and repacking are added only if you want them.",
                ka: "კურიერი და გადაფუთვა — მხოლოდ თუ გინდა.",
              },
            },
            {
              target: "calc.total",
              say: {
                en: "The total updates instantly, with customs and loyalty points.",
                ka: "ჯამი მომენტალურად ახლდება — საბაჟოთი და ქულებით.",
              },
            },
          ],
        },
      ];
