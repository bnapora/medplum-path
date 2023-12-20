export interface LogoProps {
  size: number;
  fill?: string;
}

export function Logo(props: LogoProps): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: props.size, height: props.size }}>
      <title>Gestalt Logo</title>
      <path
        fill={props.fill ?? '#FFFFFF'}
        d="
        M513.000000,198.000000 
          C513.000000,303.307739 513.000000,408.115479 513.000000,512.961609 
          C342.400574,512.961609 171.801163,512.961609 1.100867,512.961609 
          C1.100867,342.442291 1.100867,171.884491 1.100867,1.163351 
          C171.666534,1.163351 342.333252,1.163351 513.000000,1.163351 
          C513.000000,66.532135 513.000000,132.016068 513.000000,198.000000 
        M484.077393,359.578552 
          C486.054169,354.457733 488.295013,349.421631 489.968201,344.203461 
          C516.302185,262.076019 506.033081,183.733154 464.551910,109.066422 
          C446.978485,77.433960 423.358795,50.803963 391.913239,32.166798 
          C350.044312,7.351884 304.676239,3.201698 257.655273,11.520667 
          C217.296799,18.660913 180.339020,34.736511 145.484528,55.875313 
          C105.255737,80.273567 69.409134,109.825050 40.442852,147.161057 
          C13.197527,182.278839 2.521732,222.146225 11.536312,265.626587 
          C26.743114,338.974060 63.611469,399.528473 124.000664,444.641724 
          C168.943665,478.215973 220.576233,493.853668 275.953827,498.191681 
          C329.850250,502.413635 377.296143,486.680542 417.764984,450.827667 
          C446.333313,425.517822 468.248474,395.176849 484.077393,359.578552 
        z"
      />
      <path
        fill={props.fill ?? '#2A398B'}
        d="
        M483.950684,359.938171 
          C468.248474,395.176849 446.333313,425.517822 417.764984,450.827667 
          C377.296143,486.680542 329.850250,502.413635 275.953827,498.191681 
          C220.576233,493.853668 168.943665,478.215973 124.000664,444.641724 
          C63.611469,399.528473 26.743114,338.974060 11.536312,265.626587 
          C2.521732,222.146225 13.197527,182.278839 40.442852,147.161057 
          C69.409134,109.825050 105.255737,80.273567 145.484528,55.875313 
          C180.339020,34.736511 217.296799,18.660913 257.655273,11.520667 
          C304.676239,3.201698 350.044312,7.351884 391.913239,32.166798 
          C423.358795,50.803963 446.978485,77.433960 464.551910,109.066422 
          C506.033081,183.733154 516.302185,262.076019 489.968201,344.203461 
          C488.295013,349.421631 486.054169,354.457733 483.950684,359.938171 
        M414.588135,74.913437 
          C401.101898,61.321568 386.087860,49.810524 368.534271,41.958878 
          C331.038666,25.187229 292.170258,23.730265 252.636475,32.526367 
          C205.704819,42.968456 164.025772,64.737747 125.468628,92.884621 
          C98.834198,112.327873 74.556023,134.314377 54.715694,160.831451 
          C35.526665,186.478073 26.463572,215.224167 28.876318,247.385818 
          C30.900763,274.371490 39.593143,299.406738 50.978302,323.660614 
          C77.073799,379.252014 115.953018,422.734131 171.327454,450.571960 
          C203.611908,466.802002 238.126923,474.854706 273.842499,478.331726 
          C309.789825,481.831268 344.015320,475.983429 375.317230,457.427734 
          C417.328491,432.523560 446.608093,396.096619 465.916077,351.894135 
          C487.505035,302.469849 489.719330,250.888702 478.349274,198.626099 
          C468.212158,152.030579 448.470764,110.171150 414.588135,74.913437 
        z"
      />
      <path
        fill={props.fill ?? '#FFFFFF'}
        d="
        M414.836182,75.165436 
          C448.470764,110.171150 468.212158,152.030579 478.349274,198.626099 
          C489.719330,250.888702 487.505035,302.469849 465.916077,351.894135 
          C446.608093,396.096619 417.328491,432.523560 375.317230,457.427734 
          C344.015320,475.983429 309.789825,481.831268 273.842499,478.331726 
          C238.126923,474.854706 203.611908,466.802002 171.327454,450.571960 
          C115.953018,422.734131 77.073799,379.252014 50.978302,323.660614 
          C39.593143,299.406738 30.900763,274.371490 28.876318,247.385818 
          C26.463572,215.224167 35.526665,186.478073 54.715694,160.831451 
          C74.556023,134.314377 98.834198,112.327873 125.468628,92.884621 
          C164.025772,64.737747 205.704819,42.968456 252.636475,32.526367 
          C292.170258,23.730265 331.038666,25.187229 368.534271,41.958878 
          C386.087860,49.810524 401.101898,61.321568 414.836182,75.165436 
        M325.720215,292.073395 
          C328.504669,281.785370 328.945099,271.407928 327.046967,260.910126 
          C321.247589,228.835861 292.129578,205.709366 259.265076,207.116013 
          C227.307693,208.483826 199.983475,234.779587 197.127625,266.914703 
          C194.079086,301.217926 216.689438,332.222809 249.539581,338.785645 
          C282.883606,345.447144 314.884064,326.070648 325.720215,292.073395 
        M427.489105,179.434662 
          C427.598053,150.000458 400.849304,127.478516 371.477295,133.935745 
          C347.600739,139.184814 331.731110,163.375885 336.275696,187.696747 
          C340.892395,212.403625 363.753998,228.924957 388.204987,225.224457 
          C410.564026,221.840546 425.616943,204.608505 427.489105,179.434662 
        M226.242050,109.401207 
          C217.894318,94.304138 202.421570,87.895027 186.591354,92.977158 
          C171.400299,97.854095 162.049072,112.632652 164.091888,129.274750 
          C166.259369,146.932236 181.110901,159.512634 198.239456,158.377274 
          C222.959564,156.738678 236.475906,133.010849 226.242050,109.401207 
        M144.583359,269.964600 
          C143.560333,268.870941 142.593826,267.717255 141.505524,266.692932 
          C130.315811,256.160645 113.185616,254.829071 100.537209,263.483429 
          C87.426369,272.454163 82.366043,289.501740 88.456329,304.182220 
          C94.412727,318.539948 109.332825,326.910004 124.306976,324.294098 
          C149.429504,319.905365 160.190720,291.981018 144.583359,269.964600 
        M371.103485,314.219574 
          C377.897034,324.816742 389.022583,328.544739 399.454407,323.719543 
          C409.497284,319.074249 414.595795,307.586670 411.337555,296.945435 
          C407.573395,284.652130 394.642883,278.181244 382.729645,282.629059 
          C370.384125,287.238312 365.227325,300.585236 371.103485,314.219574 
        M310.114685,395.150970 
          C309.177124,394.816437 308.257721,394.413696 307.299042,394.158234 
          C299.933289,392.195282 292.560211,395.342590 288.664429,402.083191 
          C284.743835,408.866730 286.093719,417.563904 291.919739,423.056763 
          C296.930420,427.780884 305.787140,428.648041 311.827484,424.834625 
          C321.938782,418.451111 323.000031,402.381653 310.114685,395.150970 
        z"
      />
      <path
        fill={props.fill ?? '#A33995'}
        d="
        M325.578369,292.451416 
          C314.884064,326.070648 282.883606,345.447144 249.539581,338.785645 
          C216.689438,332.222809 194.079086,301.217926 197.127625,266.914703 
          C199.983475,234.779587 227.307693,208.483826 259.265076,207.116013 
          C292.129578,205.709366 321.247589,228.835861 327.046967,260.910126 
          C328.945099,271.407928 328.504669,281.785370 325.578369,292.451416 
        z"
      />
      <path
        fill={props.fill ?? '#29388B'}
        d="
        M427.473389,179.862000 
          C425.616943,204.608505 410.564026,221.840546 388.204987,225.224457 
          C363.753998,228.924957 340.892395,212.403625 336.275696,187.696747 
          C331.731110,163.375885 347.600739,139.184814 371.477295,133.935745 
          C400.849304,127.478516 427.598053,150.000458 427.473389,179.862000 
        z"
      />
      <path
        fill={props.fill ?? '#F4DA3E'}
        d="
        M226.421036,109.734558 
          C236.475906,133.010849 222.959564,156.738678 198.239456,158.377274 
          C181.110901,159.512634 166.259369,146.932236 164.091888,129.274750 
          C162.049072,112.632652 171.400299,97.854095 186.591354,92.977158 
          C202.421570,87.895027 217.894318,94.304138 226.421036,109.734558 
        z"
      />
      <path
        fill={props.fill ?? '#2A388B'}
        d="
        M144.805054,270.246399 
          C160.190720,291.981018 149.429504,319.905365 124.306976,324.294098 
          C109.332825,326.910004 94.412727,318.539948 88.456329,304.182220 
          C82.366043,289.501740 87.426369,272.454163 100.537209,263.483429 
          C113.185616,254.829071 130.315811,256.160645 141.505524,266.692932 
          C142.593826,267.717255 143.560333,268.870941 144.805054,270.246399 
        z"
      />
      <path
        fill={props.fill ?? '#A33A95'}
        d="
        M370.945770,313.878113 
          C365.227325,300.585236 370.384125,287.238312 382.729645,282.629059 
          C394.642883,278.181244 407.573395,284.652130 411.337555,296.945435 
          C414.595795,307.586670 409.497284,319.074249 399.454407,323.719543 
          C389.022583,328.544739 377.897034,324.816742 370.945770,313.878113 
        z"
      />
      <path
        fill={props.fill ?? '#F4DA3F'}
        d="
        M310.446625,395.330109 
          C323.000031,402.381653 321.938782,418.451111 311.827484,424.834625 
          C305.787140,428.648041 296.930420,427.780884 291.919739,423.056763 
          C286.093719,417.563904 284.743835,408.866730 288.664429,402.083191 
          C292.560211,395.342590 299.933289,392.195282 307.299042,394.158234 
          C308.257721,394.413696 309.177124,394.816437 310.446625,395.330109 
        z"
      />
    </svg>
  );
}
