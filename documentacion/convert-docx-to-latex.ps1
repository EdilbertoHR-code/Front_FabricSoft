$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$source = "docx_extract\word\document.xml"
$output = "Analisis_y_Diseno_FabriSoft.tex"

$xml = [xml](Get-Content -LiteralPath $source -Raw -Encoding UTF8)
$nsm = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$nsm.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")

function Get-Text($node) {
    return (($node.SelectNodes(".//w:t", $nsm) | ForEach-Object { $_.InnerText }) -join "").Trim()
}

function Get-Style($p) {
    $style = $p.SelectSingleNode("./w:pPr/w:pStyle", $nsm)
    if ($style) {
        return $style.GetAttribute("val", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
    }
    return ""
}

function Escape-Latex([string]$text) {
    if ([string]::IsNullOrWhiteSpace($text)) { return "" }
    $result = $text.Trim()
    $result = $result -replace "\\", '\textbackslash{}'
    $result = $result -replace "([#$%&_{}])", '\$1'
    $result = $result -replace "~", '\textasciitilde{}'
    $result = $result -replace "\^", '\textasciicircum{}'
    $result = $result -replace ([char]0x2192), "$\rightarrow$"
    $result = $result -replace ([char]0x2264), "$\leq$"
    $result = $result -replace ([char]0x2265), "$\geq$"
    return $result
}

function Clean-Heading([string]$text) {
    $text = $text.Trim()
    $text = $text -replace "^\d+\)\s*", ""
    $text = $text -replace "^\d+(\.\d+)*\s+", ""
    $text = $text -replace "\s+", " "
    return $text.Trim()
}

function Close-List([System.Collections.Generic.List[string]]$lines, [ref]$inList) {
    if ($inList.Value) {
        $lines.Add("\end{enumerate}")
        $lines.Add("")
        $inList.Value = $false
    }
}

function Add-Table($node, [System.Collections.Generic.List[string]]$lines) {
    $rows = @()
    foreach ($tr in $node.SelectNodes("./w:tr", $nsm)) {
        $cells = @()
        foreach ($tc in $tr.SelectNodes("./w:tc", $nsm)) {
            $cells += (Escape-Latex (Get-Text $tc))
        }
        if ($cells.Count -gt 0 -and (($cells -join "").Trim()).Length -gt 0) {
            $rows += ,$cells
        }
    }
    if ($rows.Count -eq 0) { return }
    if ($rows.Count -eq 1 -and $rows[0].Count -eq 1 -and $rows[0][0] -match "^DOCUMENTO DE AN") {
        return
    }

    if ($rows[0].Count -ge 2 -and $rows[0][0] -match "^Secci.n$" -and $rows[0][1] -eq "Contenido") {
        $expanded = @()
        foreach ($row in $rows) {
            $expanded += ,$row
            if ($row.Count -ge 1 -and $row[0] -match "^.4\s+") {
                $expanded += ,@("Sec. 4.5 Maquetado", "Prototipo visual, criterios de aprobacion y entregables responsive.")
            }
        }
        $rows = $expanded
    }

    $cols = ($rows | ForEach-Object { $_.Count } | Measure-Object -Maximum).Maximum
    if (-not $cols -or $cols -lt 1) { return }

    $width = [math]::Max(0.16, [math]::Round(0.92 / $cols, 2))
    $spec = ("p{" + $width + "\linewidth}") * $cols -join ""

    $lines.Add("\begin{longtable}{$spec}")
    $lines.Add("\toprule")
    for ($r = 0; $r -lt $rows.Count; $r++) {
        $cells = @($rows[$r])
        while ($cells.Count -lt $cols) { $cells += "" }
        if ($r -eq 0) {
            $row = ($cells | ForEach-Object { "\textbf{" + $_ + "}" }) -join " & "
            $lines.Add("$row \\")
            $lines.Add("\midrule")
        } else {
            $row = $cells -join " & "
            $lines.Add("$row \\")
        }
    }
    $lines.Add("\bottomrule")
    $lines.Add("\end{longtable}")
    $lines.Add("")
}

$lines = [System.Collections.Generic.List[string]]::new()
$lines.Add("\documentclass[11pt,letterpaper]{article}")
$lines.Add("\usepackage[margin=1in]{geometry}")
$lines.Add("\usepackage{fontspec}")
$lines.Add("\usepackage[spanish,es-nodecimaldot]{babel}")
$lines.Add("\usepackage{xcolor}")
$lines.Add("\usepackage{graphicx}")
$lines.Add("\usepackage{array}")
$lines.Add("\usepackage{booktabs}")
$lines.Add("\usepackage{longtable}")
$lines.Add("\usepackage{enumitem}")
$lines.Add("\usepackage{fancyhdr}")
$lines.Add("\usepackage{titlesec}")
$lines.Add("\usepackage{tcolorbox}")
$lines.Add("\usepackage{hyperref}")
$lines.Add("\usepackage{fvextra}")
$lines.Add("\setmainfont{Arial}")
$lines.Add("\setsansfont{Arial}")
$lines.Add("\definecolor{FabricBlack}{HTML}{0A0A0A}")
$lines.Add("\definecolor{FabricPanel}{HTML}{131313}")
$lines.Add("\definecolor{FabricChampagne}{HTML}{C9A96E}")
$lines.Add("\definecolor{FabricText}{HTML}{252525}")
$lines.Add("\hypersetup{colorlinks=true, linkcolor=FabricBlack, urlcolor=FabricChampagne}")
$lines.Add("\pagestyle{fancy}")
$lines.Add("\fancyhf{}")
$lines.Add("\lhead{\textsf{FABRIC Oracle Critical Engineering}}")
$lines.Add("\rhead{\textsf{An\'alisis y Dise\~no}}")
$lines.Add("\cfoot{\thepage}")
$lines.Add("\titleformat{\section}{\Large\bfseries\sffamily\color{FabricBlack}}{\thesection}{0.8em}{}[\titlerule]")
$lines.Add("\titleformat{\subsection}{\large\bfseries\sffamily\color{FabricBlack}}{\thesubsection}{0.8em}{}")
$lines.Add("\titleformat{\subsubsection}{\normalsize\bfseries\sffamily\color{FabricBlack}}{\thesubsubsection}{0.8em}{}")
$lines.Add("\setlist[enumerate]{leftmargin=*, itemsep=0.25em, topsep=0.25em}")
$lines.Add("\setlength{\parindent}{0pt}")
$lines.Add("\setlength{\parskip}{0.65em}")
$lines.Add("")
$lines.Add("\begin{document}")
$lines.Add("\begin{titlepage}")
$lines.Add("\pagecolor{FabricBlack}\color{white}")
$lines.Add("\vspace*{2cm}")
$lines.Add("{\Huge\bfseries\sffamily FABRIC\par}")
$lines.Add("\vspace{0.3cm}")
$lines.Add("{\Large Oracle Critical Engineering\par}")
$lines.Add("\vfill")
$lines.Add("{\huge\bfseries Documento de An\'alisis y Dise\~no\par}")
$lines.Add("\vspace{0.35cm}")
$lines.Add("{\Large FabriSoft / fabricsoft.com.mx\par}")
$lines.Add("\vspace{1cm}")
$lines.Add("{\large Versi\'on t\'ecnica revisada -- Motor IA + Panel Admin incluidos en V1\par}")
$lines.Add("{\large Mayo 2026\par}")
$lines.Add("\vfill")
$lines.Add("{\color{FabricChampagne}\rule{\textwidth}{1.2pt}}\par")
$lines.Add("\vspace{0.4cm}")
$lines.Add("{\large Equipo A -- Edi + Gerardo -- Supervisi\'on Julio \'Alvarez\par}")
$lines.Add("\end{titlepage}")
$lines.Add("\nopagecolor\color{FabricText}")
$lines.Add("\tableofcontents")
$lines.Add("\newpage")
$lines.Add("")

$children = $xml.document.body.ChildNodes
$startIndex = 0
for ($i = 0; $i -lt $children.Count; $i++) {
    if ($children[$i].LocalName -eq "p" -and (Get-Text $children[$i]) -like "FABRIC Oracle Critical Engineering*") {
        $startIndex = $i
        break
    }
}

$inList = $false
$insertedMockup = $false

for ($i = $startIndex; $i -lt $children.Count; $i++) {
    $node = $children[$i]
    if ($node.LocalName -eq "tbl") {
        Close-List $lines ([ref]$inList)
        Add-Table $node $lines
        continue
    }
    if ($node.LocalName -ne "p") { continue }

    $text = Get-Text $node
    if ([string]::IsNullOrWhiteSpace($text)) { continue }
    if ($text -match "^SECCI.N \d+ DE \d+$") { continue }
    if ($text -like "FABRIC Oracle Critical Engineering*") { continue }
    if ($text -match "^DOCUMENTO DE AN.LISIS") { continue }

    $style = Get-Style $node

    if (-not $insertedMockup -and $style -eq "Heading1" -and $text -match "^Arquitectura t.cnica") {
        Close-List $lines ([ref]$inList)
        $lines.Add("\section{Maquetado y prototipado visual}")
        $lines.Add("Esta seccion queda reservada para incorporar el maquetado final del sitio y sus pantallas clave. El objetivo es conectar los lineamientos de UI/UX con decisiones visuales verificables antes de pasar a implementacion.")
        $lines.Add("")
        $lines.Add("\subsection{Entregables de maquetado}")
        $lines.Add("\begin{enumerate}")
        $lines.Add("\item Home completa con las secciones S01--S16 en vista desktop, tablet y mobile.")
        $lines.Add("\item Flujos principales: diagnostico, comparador ERP, aplicacion a Wait List, Office Hours y descarga de papers.")
        $lines.Add("\item Estados de interfaz: loading, error, exito, rechazo silencioso, capacidad llena y navegacion mobile.")
        $lines.Add("\item Panel Admin con dashboard, tabla de leads, edicion de metricas y control de capacidad.")
        $lines.Add("\end{enumerate}")
        $lines.Add("")
        $lines.Add("\subsection{Criterios de aprobacion visual}")
        $lines.Add("\begin{enumerate}")
        $lines.Add("\item Coherencia con tokens definidos: fondo oscuro, acento champagne, bordes sobrios y tipografia premium.")
        $lines.Add("\item Lectura clara en primer viewport: autoridad, problema que resuelve FABRIC y accion siguiente.")
        $lines.Add("\item Diseno responsive sin scroll horizontal, sin solapamientos y con jerarquia clara en pantallas pequenas.")
        $lines.Add("\item Prototipo navegable apto para revision ejecutiva y handoff tecnico.")
        $lines.Add("\end{enumerate}")
        $lines.Add("")
        $insertedMockup = $true
    }

    if ($style -eq "Heading1") {
        Close-List $lines ([ref]$inList)
        $heading = Clean-Heading $text
        if (-not [string]::IsNullOrWhiteSpace($heading)) {
            $lines.Add("\section{" + (Escape-Latex $heading) + "}")
            $lines.Add("")
        }
        continue
    }
    if ($style -eq "Heading2" -or ($text -match "^\d+\.\d+\s+")) {
        Close-List $lines ([ref]$inList)
        $lines.Add("\subsection{" + (Escape-Latex (Clean-Heading $text)) + "}")
        $lines.Add("")
        continue
    }
    if ($style -eq "Heading3" -or $style -eq "Heading4") {
        Close-List $lines ([ref]$inList)
        $lines.Add("\subsubsection{" + (Escape-Latex (Clean-Heading $text)) + "}")
        $lines.Add("")
        continue
    }

    if ($text -match "^\d+\.\s+(.+)$") {
        if (-not $inList) {
            $lines.Add("\begin{enumerate}")
            $inList = $true
        }
        $lines.Add("\item " + (Escape-Latex $Matches[1]))
        continue
    }

    Close-List $lines ([ref]$inList)

    if ($text -like "fabricsoft/ *") {
        $lines.Add("\begin{Verbatim}[fontsize=\small, breaklines=true]")
        $lines.Add($text)
        $lines.Add("\end{Verbatim}")
        $lines.Add("")
    } else {
        $lines.Add((Escape-Latex $text))
        $lines.Add("")
    }
}

Close-List $lines ([ref]$inList)
$lines.Add("\end{document}")

[System.IO.File]::WriteAllLines((Join-Path (Get-Location) $output), $lines, [System.Text.UTF8Encoding]::new($false))
Write-Output "Wrote $output"
