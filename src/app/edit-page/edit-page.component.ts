import { UserModel } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  opened: boolean = false;
  userId!: any;
  newUser: UserModel = new UserModel();
  user!: UserModel;
  userForm!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  languages: string[] = [
    'Abkhazian',
    'Afar',
    'Afrikaans',
    'Akan',
    'Albanian',
    'Amharic',
    'Arabic',
    'Aragonese',
    'Armenian',
    'Assamese',
    'Avaric',
    'Avestan',
    'Aymara',
    'Azerbaijani',
    'Bambara',
    'Bashkir',
    'Basque',
    'Belarusian',
    'Bengali',
    'Bihari languages',
    'Bislama',
    'Bosnian',
    'Breton',
    'Bulgarian',
    'Burmese',
    'Catalan, Valencian',
    'Central Khmer',
    'Chamorro',
    'Chechen',
    'Chichewa, Chewa, Nyanja',
    'Chinese',
    'Church Slavonic, Old Bulgarian, Old Church Slavonic',
    'Chuvash',
    'Cornish',
    'Corsican',
    'Cree',
    'Croatian',
    'Czech',
    'Danish',
    'Divehi, Dhivehi, Maldivian',
    'Dutch, Flemish',
    'Dzongkha',
    'English',
    'Esperanto',
    'Estonian',
    'Ewe',
    'Faroese',
    'Fijian',
    'Finnish',
    'French',
    'Fulah',
    'Gaelic, Scottish Gaelic',
    'Galician',
    'Ganda',
    'Georgian',
    'German',
    'Gikuyu, Kikuyu',
    'Greek (Modern)',
    'Greenlandic, Kalaallisut',
    'Guarani',
    'Gujarati',
    'Haitian, Haitian Creole',
    'Hausa',
    'Hebrew',
    'Herero',
    'Hindi',
    'Hiri Motu',
    'Hungarian',
    'Icelandic',
    'Ido',
    'Igbo',
    'Indonesian',
    'Interlingua (International Auxiliary Language Association)',
    'Interlingue',
    'Inuktitut',
    'Inupiaq',
    'Irish',
    'Italian',
    'Japanese',
    'Javanese',
    'Kannada',
    'Kanuri',
    'Kashmiri',
    'Kazakh',
    'Kinyarwanda',
    'Komi',
    'Kongo',
    'Korean',
    'Kwanyama, Kuanyama',
    'Kurdish',
    'Kyrgyz',
    'Lao',
    'Latin',
    'Latvian',
    'Letzeburgesch, Luxembourgish',
    'Limburgish, Limburgan, Limburger',
    'Lingala',
    'Lithuanian',
    'Luba-Katanga',
    'Macedonian',
    'Malagasy',
    'Malay',
    'Malayalam',
    'Maltese',
    'Manx',
    'Maori',
    'Marathi',
    'Marshallese',
    'Moldovan, Moldavian, Romanian',
    'Mongolian',
    'Nauru',
    'Navajo, Navaho',
    'Northern Ndebele',
    'Ndonga',
    'Nepali',
    'Northern Sami',
    'Norwegian',
    'Norwegian Bokmål',
    'Norwegian Nynorsk',
    'Nuosu, Sichuan Yi',
    'Occitan (post 1500)',
    'Ojibwa',
    'Oriya',
    'Oromo',
    'Ossetian, Ossetic',
    'Pali',
    'Panjabi, Punjabi',
    'Pashto, Pushto',
    'Persian',
    'Polish',
    'Portuguese',
    'Quechua',
    'Romansh',
    'Rundi',
    'Russian',
    'Samoan',
    'Sango',
    'Sanskrit',
    'Sardinian',
    'Serbian',
    'Shona',
    'Sindhi',
    'Sinhala, Sinhalese',
    'Slovak',
    'Slovenian',
    'Somali',
    'Sotho, Southern',
    'South Ndebele',
    'Spanish, Castilian',
    'Sundanese',
    'Swahili',
    'Swati',
    'Swedish',
    'Tagalog',
    'Tahitian',
    'Tajik',
    'Tamil',
    'Tatar',
    'Telugu',
    'Thai',
    'Tibetan',
    'Tigrinya',
    'Tonga (Tonga Islands)',
    'Tsonga',
    'Tswana',
    'Turkish',
    'Turkmen',
    'Twi',
    'Uighur, Uyghur',
    'Ukrainian',
    'Urdu',
    'Uzbek',
    'Venda',
    'Vietnamese',
    'Volap_k',
    'Walloon',
    'Welsh',
    'Western Frisian',
    'Wolof',
    'Xhosa',
    'Yiddish',
    'Yoruba',
    'Zhuang, Chuang',
    'Zulu'
  ];
  interests: string[] = [
    '3D printing',
    'Amateur radio',
    'Scrapbook',
    'Amateur radio',
    'Acting',
    'Baton twirling',
    'Board games',
    'Book restoration',
    'Cabaret',
    'Calligraphy',
    'Candle making',
    'Computer programming',
    'Coffee roasting',
    'Cooking',
    'Colouring',
    'Cosplaying',
    'Couponing',
    'Creative writing',
    'Crocheting',
    'Cryptography',
    'Dance',
    'Digital arts',
    'Drama',
    'Drawing',
    'Do it yourself',
    'Electronics',
    'Embroidery',
    'Fashion',
    'Flower arranging',
    'Foreign language learning',
    'Gaming',
    'Tabletop games',
    'Role-playing games',
    'Gambling',
    'Genealogy',
    'Glassblowing',
    'Gunsmithing',
    'Homebrewing',
    'Ice skating',
    'Jewelry making',
    'Jigsaw puzzles',
    'Juggling',
    'Knapping',
    'Knitting',
    'Kabaddi',
    'Knife making',
    'Lacemaking',
    'Lapidary',
    'Leather crafting',
    'Lego building',
    'Lockpicking',
    'Machining',
    'Macrame',
    'Metalworking',
    'Magic',
    'Model building',
    'Listening to music',
    'Origami',
    'Painting',
    'Playing musical instruments',
    'Pet',
    'Poi',
    'Pottery',
    'Puzzles',
    'Quilting',
    'Reading',
    'Scrapbooking',
    'Sculpting',
    'Sewing',
    'Singing',
    'Sketching',
    'Soapmaking',
    'Sports',
    'Stand-up comedy',
    'Sudoku',
    'Table tennis',
    'Taxidermy',
    'Video gaming',
    'Watching movies',
    'Web surfing',
    'Whittling',
    'Wood carving',
    'Woodworking',
    'World Building',
    'Writing',
    'Yoga',
    'Yo-yoing',
    'Air sports',
    'Archery',
    'Astronomy',
    'Backpacking',
    'Base jumping',
    'Baseball',
    'Basketball',
    'Beekeeping',
    'Bird watching',
    'Blacksmithing',
    'Board sports',
    'Bodybuilding',
    'Brazilian jiu-jitsu',
    'Community',
    'Cycling',
    'Dowsing',
    'Driving',
    'Fishing',
    'Flag football',
    'Flying',
    'Flying disc',
    'Foraging',
    'Gardening',
    'Geocaching',
    'Ghost hunting',
    'Graffiti',
    'Handball',
    'Hiking',
    'Hooping',
    'Horseback riding',
    'Hunting',
    'Inline skating',
    'Jogging',
    'Kayaking',
    'Kite flying',
    'Kitesurfing',
    'Larping',
    'Letterboxing',
    'Metal detecting',
    'Motor sports',
    'Mountain biking',
    'Mountaineering',
    'Mushroom hunting',
    'Mycology',
    'Netball',
    'Nordic skating',
    'Orienteering',
    'Paintball',
    'Parkour',
    'Photography',
    'Polo',
    'Rafting',
    'Rappelling',
    'Rock climbing',
    'Roller skating',
    'Rugby',
    'Running',
    'Sailing',
    'Sand art',
    'Scouting',
    'Scuba diving',
    'Sculling',
    'Rowing',
    'Shooting',
    'Shopping',
    'Skateboarding',
    'Skiing',
    'Skim Boarding',
    'Skydiving',
    'Slacklining',
    'Snowboarding',
    'Stone skipping',
    'Surfing',
    'Swimming',
    'Taekwondo',
    'Tai chi',
    'Urban exploration',
    'Vacation',
    'Vehicle restoration',
    'Water sports'
  ]

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.userId = this.activatedRouter.snapshot.paramMap.get('id');

    this.loggedUser();

  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  loggedUser() {
    this.userService.logedInUser(this.userId).subscribe((data) => {
      console.log(data);
      this.user = data;
      console.log(this.user.fullname);
      this.editForm();
    })
  }

  initForm() {
    this.userForm = new FormGroup({
      name: this.fb.control(''),
      surname: this.fb.control(''),
      username: this.fb.control(''),
      email: this.fb.control(''),
      password: this.fb.control(''),
      language: this.fb.control(''),
      interests: this.fb.control(''),
      description: this.fb.control(''),
    })
  }

  editForm() {
    this.userForm.patchValue({
      name: this.user.name,
      surname: this.user.surname,
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      language: this.user.language,
      interests: this.user.interests,
      description: this.user.description
    })
  }

  onSubmit(formValue: any) {
    this.user.name = formValue.name;
    this.user.surname = formValue.surname;
    this.user.username = formValue.username;
    this.user.email = formValue.email;
    this.user.password = formValue.password;
    this.user.language = formValue.language;
    this.user.interests = formValue.interests;
    this.user.description = formValue.description;
    this.userService.editUser(this.userId, this.user).subscribe((data : any) => {
      console.log(data);
      this.goToChatPage();

    })
  }

  refresh() {
    window.location.reload();
  }

  resetForm() {
    this.userForm.reset();
  }

  goToEditPage() {
    this.router.navigate(['api/user/main-page/' +this.userId + "/edit/" + this.userId]);
  }

  goToChatPage() {
    this.router.navigate(['api/user/main-page/' + this.userId + "/chat-page/" + this.userId]);
  }

}
