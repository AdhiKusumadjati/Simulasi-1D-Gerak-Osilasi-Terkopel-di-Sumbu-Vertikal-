//Plot Posisi-Waktu untuk Benda 1 Tak Teredam
gnuplot> cd 'D:\VIVIDITY\S2\SEMESTER 2\Komputasi Sistem Fisis\RBL\Script Benda 1 Tak Teredam'
gnuplot> set xlabel “{/Italic t)" font “Times,12”
gnuplot> set ylabel “{/Italic y)" font “Times,12”
gnuplot> plot'data.dat't""

//Plot Posisi-Waktu untuk Benda 1 Teredam
gnuplot> cd 'D:\VIVIDITY\S2\SEMESTER 2\Komputasi Sistem Fisis\RBL\Script Benda 1 Teredam'
gnuplot> set xlabel “{/Italic t)" font “Times,12”
gnuplot> set ylabel “{/Italic y)" font “Times,12”
gnuplot> plot'data.dat't""

//Plot Posisi-Waktu untuk Benda 1&2 Teredam
gnuplot> cd 'D:\VIVIDITY\S2\SEMESTER 2\Komputasi Sistem Fisis\RBL\Script Benda 2 Teredam'
gnuplot> set xlabel “{/Italic t)" font “Times,12”
gnuplot> set ylabel “{/Italic y)" font “Times,12”
gnuplot> plot'benda 1.dat't"m1",'benda 2.dat't"m2"

//Plot Posisi-Waktu untuk Benda 1,2&3 Teredam
gnuplot> cd 'D:\VIVIDITY\S2\SEMESTER 2\Komputasi Sistem Fisis\RBL\Script Benda 3 Teredam'
gnuplot> set xlabel “{/Italic t)" font “Times,12”
gnuplot> set ylabel “{/Italic y)" font “Times,12”
gnuplot> plot'benda1.dat't"m1",'benda2.dat't"m2",'benda3.dat't"m3"

//Plot Amaks-N
gnuplot> cd 'D:\VIVIDITY\S2\SEMESTER 2\Komputasi Sistem Fisis\RBL'
gnuplot> set xlabel “{/Italic Amaks)" font “Times,12”
gnuplot> set ylabel “{/Italic N)" font “Times,12”
gnuplot> plot’ksama.dat’t””

//Plot Amaks-N
gnuplot> cd 'D:\VIVIDITY\S2\SEMESTER 2\Komputasi Sistem Fisis\RBL'
gnuplot> set xlabel “{/Italic Amaks)" font “Times,12”
gnuplot> set ylabel “{/Italic N)" font “Times,12”
gnuplot> plot’ksama.dat’t”k = 10”, ’ksama2.dat’t”k = 15”, ’ksama3.dat’t”k = 20”
