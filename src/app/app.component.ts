import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


interface Image {
  id: number;
  url: string;
}

interface Voyage {
 
  nom: string;
  images: Image[];
  destination: string;
  prixinitial: number;
  villes: string;
  placepossible: number;
}


@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet,ReactiveFormsModule,NgbModule,ToastrModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[NgbCarouselConfig,ToastrService],
})
// @flyInOut({
  
// })
export class AppComponent {
  title = 'controle_angular_bouaddis';
  form !: FormGroup;
  showDialog = false;
  reservedList !: Voyage[] ;
  selectedVoyage !: Voyage;
  reservedPlace !: number;
  reservedRepas !: number;
  reservedChambre !: number;
  toaster !: ToastrService  ;
  voyages: Voyage[] = [
    {
      
      nom: "voyage1",
      images: [
        {
          id: 1,
          url: "https://www.dirent.ma/wp-content/uploads/2021/10/Ifrane-Neige.jpg"
        },
        {
          id: 2,
          url: "https://upload.wikimedia.org/wikipedia/commons/b/be/Aranas.jpg"
        }
      ],
      destination: "ifrane",
      prixinitial: 100,
      villes: "marrakech",
      placepossible: 20
    },
    {
      
      nom: "voyage2",
      images: [
        {
          id: 1,
          url: "https://www.frs.es/fileadmin/_processed_/3/7/csm_csm-frs-iberia-destinos-rabat_06cdf5682b.jpg"
        },
        {
          id: 2,
          url: "https://atlanticagdal.com/wp-content/uploads/2017/11/tour-hassan-rabat-maroc1-1024x683.jpg"
        }
      ],
      destination: "fes",
      prixinitial: 150,
      villes: "rabat",
      placepossible: 30
    },
    {
      
      nom: "voyage3",
      images: [
        {
          id: 1,
          url: "https://images.ctfassets.net/bth3mlrehms2/1TwENu0ZXSnwNu6GzVfVE4/fa1176816167c1a03589cd613458585d/Marokko_Casablanca_Hassan_II_Moschee.jpg?w=3864&h=2173&fl=progressive&q=50&fm=jpg"
        },
        {
          id: 2,
          url: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/469000/469964-Hassan-Ii-Mosque.jpg"
        }
      ],
      destination: "casablanca",
      prixinitial: 150,
      villes: "marrakech",
      placepossible: 50
    },
    {
      
      nom: "voyage4",
      images: [
        {
          id: 1,
          url: "https://cdn.britannica.com/76/143676-050-D7A6FE61/Agadir-Mor.jpg"
        },
        {
          id: 2,
          url: "https://cdn.getyourguide.com/img/tour/641e3943917fc.jpeg/145.jpg"
        }
      ],
      destination: "agadir",
      prixinitial: 170,
      villes: "casablanca",
      placepossible: 10
    }
  ];

  constructor(private toastr:ToastrService,private formBuilder: FormBuilder,private cdRef: ChangeDetectorRef,private config: NgbCarouselConfig){
    this.reservedList = [];
    this.form = this.formBuilder.group({
      reservePlaces:["",Validators.required],
      reserveRepas:["",Validators.required],
      reserveChambre:["",Validators.required]
    });
    this.toaster = this.toastr;
    this.config.interval = 5000;
    this.config.keyboard = true;
  }
  onSubmit() {
    const placeFrom = this.form.value["reservePlaces"];
    this.reservedRepas = this.form.value["reserveRepas"];
    this.reservedChambre = this.form.value["reserveChambre"];
    if (placeFrom > this.selectedVoyage.placepossible) {
      this.toaster.error("Error : Cannot reserve more places than available.", "PLace insuffisant");
      console.log("Error: Cannot reserve more places than available.");
      return;
    }
    if (this.selectedVoyage.placepossible === 0) {
      this.cdRef.detectChanges();
    }
    
    this.selectedVoyage.placepossible -= placeFrom;
    if(this.reservedRepas > 0){
      this.selectedVoyage.prixinitial = this.selectedVoyage.prixinitial + (this.reservedRepas * 100);
    }
    if(this.reservedChambre === 5){
      this.selectedVoyage.prixinitial += (this.selectedVoyage.prixinitial * 0.3)
    }else{
      this.selectedVoyage.prixinitial += (this.selectedVoyage.prixinitial * 0.2)
    }
    const formData = {
      selectedVoyage: this.selectedVoyage,
    };
    this.toaster.success("La reservation a ete effecute", "Reservation");
    this.reservedList.push(this.selectedVoyage);
    console.log("placeForm : ", placeFrom);
    console.log("Selected voyage : ", this.selectedVoyage);
    console.log("reserved list : ", this.reservedList);
  }
  getVoyage(voyagge : any){
    this.selectedVoyage = voyagge;
  }
  // showReservationDialog(placeFromForm: number) {
  //     this.showDialog = true;
  // }

  // closeReservationDialog() {
  //   this.showDialog = false;
  // }

}
function flyInOut(arg0: {}): (target: typeof AppComponent) => void | typeof AppComponent {
  throw new Error('Function not implemented.');
}

