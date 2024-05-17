\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{cover-Bram}[2023/12/01 v0.9 cover-Bram]

%%%%%%%%%%%%%%%%%%%%%%%
% NEW PACKAGE OPTIONS %
%%%%%%%%%%%%%%%%%%%%%%%
\newif\if@serif
\DeclareOption{serif}{\@seriftrue}
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{bookcover}}

\ProcessOptions\relax
\LoadClass[markcolor=red, 12pt, coverheight=297mm, coverwidth=210mm]{bookcover}


%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Overall document layout %
%%%%%%%%%%%%%%%%%%%%%%%%%%%
\RequirePackage{babel}
\RequirePackage{microtype}
\RequirePackage{adjustbox}
\RequirePackage[hidelinks]{hyperref}

%%%%%%%%%
% Fonts %
%%%%%%%%%
\RequirePackage{amsmath} % needs before math font selection
\RequirePackage{amssymb}
\RequirePackage{bigints}
\RequirePackage{fontspec} % advanced font selector
\setmainfont[Scale = MatchLowercase]{DejaVu Serif} % open serif font
\setsansfont[Scale = MatchLowercase]{DejaVu Sans} % open sans font
\setmonofont[Scale = MatchLowercase]{DejaVu Sans Mono}
\if@serif
\usepackage{unicode-math}
\setmathfont[Scale = MatchLowercase]{Math TeX Gyre DeJaVu} % math font equal in style and size to DejaVu Serif
% \SetSymbolFont{symbols}{bold}{OMS}{zavm}{m}{n}
\else
\renewcommand{\familydefault}{\sfdefault}
\RequirePackage{arevmath} % math font that is equal in style DejaVu Sans, but better a, nu, omega, l, x ect
\DeclareMathSizes{8}{6.32}{5}{5}
\DeclareMathSizes{9}{7.1}{6}{5}
\DeclareMathSizes{10}{7.9}{6}{5}
\DeclareMathSizes{10.95}{8.65}{7}{5}
\DeclareMathSizes{12}{9.4}{7.6}{6}
\SetSymbolFont{symbols}{bold}{OMS}{zavm}{m}{n} % surpress warning of bold math sybols
\RequirePackage{bm}
\fi
\RequirePackage{csquotes} % proper quotation marks
\RequirePackage{physics} % propper fonts for derivatives, operators ect.


% New commands to store the required information.
\renewcommand*\title[1]{\def\@title{#1}\hypersetup{pdftitle=#1}}
\newcommand*\subtitle[2][black]{\def\@subtitlecolor{#1}\def\@subtitle{#2}\hypersetup{pdfsubject=#2}}
\newcommand*\keywords[1]{\def\@keywords{#1}\hypersetup{pdfkeywords={#1}}}
\renewcommand*\abstract[1]{\def\@abstract{#1}}
\newcommand*\othersabove[1]{\def\@othersabove{#1}}
\newcommand*\othersbelow[1]{\def\@othersbelow{#1}}
\newcommand*\othersback[1]{\def\@othersback{#1}}
\newcommand*\backbottom[1]{\def\@backbottom{#1}}
\newcommand*\firstauthor[1]{\def\@firstauthor{#1}}
\renewcommand*\copyright[1]{\def\@copyright{#1}}


% Create front page.
\def\makeoutside{
	\begin{bookcover}
		
		% Remarks
		\bookcovercomponent{center}{above front}{\textcolor{red}{Cover Front (outside)}}
		\bookcovercomponent{center}{above back}{\textcolor{red}{Cover Back (outside)}}
		
		% Title on the spine
		\bookcovercomponent{center}{spine}[0mm, 0mm, 0mm, 0mm]{
			\adjustbox{minipage=257mm,rotate=270}{\normalfont\bfseries \@firstauthor \hspace{0.5cm} -- \hspace{0.5cm} \@title}}
		
		% Text and picture on the front cover
		\bookcovercomponent{normal}{front}[22mm,20mm,22mm,60mm]{\raggedright
			
			% Write title and subtitle
			{
				\baselineskip=28pt
				\normalfont\bfseries
				\Huge \@title
				\ifdefined\@subtitle \\[3pt] \normalfont\LARGE \@subtitle \fi \\[13mm]
			}
			
			% Write author and others information
			{
				\baselineskip=8pt
				\Large
				\ifdefined\@othersabove \@othersabove \\ \fi
				\textbf{\@author}\\
				\ifdefined\@othersbelow \@othersbelow \\ \fi
			}
			
		}
		
		
		
		
		% Text on the back cover
		\bookcovercomponent{normal}{back}[22mm,20mm,22mm,30mm]{
			{\bfseries\fontsize{14pt}{14.5pt}\selectfont \uppercase{abstract}\\[5mm]}
			\rmfamily
			
			\@abstract \\
			
			\textbf{Keywords:} \@keywords\\
		
			\textbf{\@firstauthor} \\
			\ifdefined\@othersback \@othersback \\ \fi
			\vfill
			
			\centering
			\ifdefined\@backbottom \@backbottom \fi
		}
		
	\end{bookcover}
}

\def\makeinside{
		\begin{bookcover}
		
		% Remark
		\bookcovercomponent{center}{above inside front}{\textcolor{red}{Cover Back (inside)}}
		\bookcovercomponent{center}{above inside back}{\textcolor{red}{Cover Front (inside)}}
		
%		\bookcovercomponent{center}{above inside back}{\textcolor{red}{\textsc{Dissertation} book (inside)}}
		
		% Text on the inside back cover
		\bookcovercomponent{normal}{inside back}[22mm,20mm,22mm,200mm]{
			\vfill
			\ifdefined\@copyright \@copyright \fi}
		
	\end{bookcover}
}
