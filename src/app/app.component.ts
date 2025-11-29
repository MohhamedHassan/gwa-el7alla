import { Component,ElementRef,HostListener, ViewChild  } from '@angular/core';
 
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gwaa-el7alla';
  menu = [{img:'/assets/images/Container.png'},{img:'/assets/images/Container2.png'},{img:'/assets/images/Container3.png'} ]
  responsive = [
            {
                breakpoint: '1199px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ]
  
   @ViewChild('counter1') counter1!: ElementRef;
  @ViewChild('counter2') counter2!: ElementRef;
  @ViewChild('counter3') counter3!: ElementRef;
show=false
  ngAfterViewInit() {
         this.animateCounter(this.counter1.nativeElement, 30); // العدد المستهدف
    this.animateCounter(this.counter2.nativeElement, 102);
    this.animateCounter(this.counter3.nativeElement, 3);
    if (!(window as any).instgrm) {
      const script = document.createElement('script');
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => (window as any).instgrm.Embeds.process();
    } else {
      (window as any).instgrm.Embeds.process();
    }
  }

  isScrolled = false; // حالة الـ scroll

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
    activeLink: string = 'home'; // القيمة الإفتراضية

  setActive(link: string) {
    this.activeLink = link;
  }
   animateCounter(element: HTMLElement, target: number) {
    let current = 0;
    const duration = 700; // مدة العد بالميلي ثانية
    const step = target / (duration / 16); // سرعة الزيادة (16ms ~ frame)

    const update = () => {
      current += step;
      if (current < target) {
        element.innerText = Math.floor(current).toString();
        requestAnimationFrame(update);
      } else {
        element.innerText = target + '+'; // الوصول للرقم النهائي
      }
    };
    update();
  }

}
