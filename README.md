# 프로젝트 구조

node src/server.js

```
database : postgresql
템플릿 : ejs 사용 불편으로 바꿀까 생각중
```

```bash
/project-root
│── /src
│   ├── /config          # 환경 변수, DB 설정 등
│   ├── /controllers     # 요청을 처리하는 컨트롤러
│   ├── /models          # 데이터 모델 정의
│   ├── /routes          # API 라우트 정의
│   ├── /middlewares     # 인증, 에러 처리 등의 미들웨어
│   ├── /services        # 비즈니스 로직을 처리하는 서비스 레이어
│   ├── /utils           # 공통 유틸리티 함수
│   ├── /views           # EJS 템플릿 파일 (템플릿 엔진을 사용할 경우)
│   ├── app.js           # Express 애플리케이션 초기화
│   └── server.js        # 서버 실행 파일
│
├── /public              # 정적 파일 (CSS, JS, 이미지 등)
│
├── /tests               # 테스트 코드
│
├── .env                 # 환경 변수 파일
├── package.json         # 프로젝트 메타 정보 및 종속성 목록
└── README.md            # 프로젝트 설명 파일
```


ERD
[Uploading erd.drawio…]()<mxfile host="Electron" agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) draw.io/26.2.2 Chrome/134.0.6998.178 Electron/35.1.2 Safari/537.36" version="26.2.2">
  <diagram id="C5RBs43oDa-KdzZeNtuy" name="Page-1">
    <mxGraphModel dx="3597" dy="3242" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="WIyWlLk6GJQsqaUBKTNV-0" />
        <mxCell id="WIyWlLk6GJQsqaUBKTNV-1" parent="WIyWlLk6GJQsqaUBKTNV-0" />
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-7" value="manufacturer" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;strokeColor=default;fontSize=16;rounded=1;swimlaneLine=1;align=center;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="-80" y="-40" width="250" height="212" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-8" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-7">
          <mxGeometry y="30" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-9" value="PK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-8">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-10" value="manufacturer_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-8">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-11" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-7">
          <mxGeometry y="60" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-12" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-11">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-13" value="manufacturer_name" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-11">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-14" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-7">
          <mxGeometry y="90" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-15" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-14">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-16" value="country_code" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-14">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-18" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-7">
          <mxGeometry y="120" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-19" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-18">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-20" value="founded_year" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-18">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-21" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-7">
          <mxGeometry y="150" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-22" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-21">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-23" value="logo_url" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-21">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-24" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-7">
          <mxGeometry y="180" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-25" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-24">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-26" value="create_at" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-24">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-67" value="users" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;strokeColor=default;fontSize=16;rounded=1;swimlaneLine=1;align=center;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="-520" y="600" width="250" height="332" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-68" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-67">
          <mxGeometry y="30" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-69" value="PK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-68">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-70" value="user_seq" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-68">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-71" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-67">
          <mxGeometry y="60" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-72" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-71">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-73" value="user_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-71">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-74" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-67">
          <mxGeometry y="90" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-75" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-74">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-76" value="user_pw" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-74">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-77" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-67">
          <mxGeometry y="120" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-78" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-77">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-79" value="user_salt" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-77">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-370" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-67">
          <mxGeometry y="150" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-371" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-370">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-372" value="name" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-370">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-373" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-67">
          <mxGeometry y="180" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-374" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-373">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-375" value="nick_name" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-373">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-80" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-67">
          <mxGeometry y="210" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-81" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-80">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-82" value="email" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-80">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-83" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-67">
          <mxGeometry y="240" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-84" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-83">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-85" value="phone_number" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-83">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-376" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-67">
          <mxGeometry y="270" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-377" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-376">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-378" value="last_login_at" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-376">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-367" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-67">
          <mxGeometry y="300" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-368" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-367">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-369" value="create_at" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-367">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-86" value="board" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;strokeColor=default;fontSize=16;rounded=1;swimlaneLine=1;align=center;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="-69" y="690" width="250" height="302" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-87" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-86">
          <mxGeometry y="30" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-88" value="PK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-87">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-89" value="board_seq" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-87">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-90" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-86">
          <mxGeometry y="60" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-91" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-90">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-92" value="title" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-90">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-430" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-86">
          <mxGeometry y="90" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-431" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-430">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-432" value="content" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-430">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-93" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-86">
          <mxGeometry y="120" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-94" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-93">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-95" value="like_count" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-93">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-388" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-86">
          <mxGeometry y="150" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-389" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-388">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-390" value="create_user" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-388">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-102" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-86">
          <mxGeometry y="180" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-103" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-102">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-104" value="create_at" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-102">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-379" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-86">
          <mxGeometry y="210" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-380" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-379">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-381" value="update_at" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-379">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-382" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-86">
          <mxGeometry y="240" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-383" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-382">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-384" value="delete_at" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-382">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-385" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-86">
          <mxGeometry y="270" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-386" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-385">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-387" value="delete_flag" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-385">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-151" value="engine_specs" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;strokeColor=default;fontSize=16;rounded=1;swimlaneLine=1;align=center;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="810" y="-120" width="250" height="240" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-152" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-151">
          <mxGeometry y="30" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-153" value="FK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-152">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-154" value="trim_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-152">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-155" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-151">
          <mxGeometry y="60" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-156" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-155">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-157" value="engin_type" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-155">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-158" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-151">
          <mxGeometry y="90" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-159" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-158">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-160" value="aspiration" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-158">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-250" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-151">
          <mxGeometry y="120" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-251" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-250">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-252" value="displacement" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-250">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-253" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-151">
          <mxGeometry y="150" width="250" height="28" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-254" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-253">
          <mxGeometry width="56" height="28" as="geometry">
            <mxRectangle width="56" height="28" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-255" value="fuel_type" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-253">
          <mxGeometry x="56" width="194" height="28" as="geometry">
            <mxRectangle width="194" height="28" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-199" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-151">
          <mxGeometry y="178" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-200" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-199">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-201" value="max_power" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-199">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-202" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-151">
          <mxGeometry y="208" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-203" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-202">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-204" value="max_torque" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-202">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-210" value="dimension_specs" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;strokeColor=default;fontSize=16;rounded=1;swimlaneLine=1;align=center;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="810" y="290" width="250" height="332" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-217" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-210">
          <mxGeometry y="30" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-218" value="FK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-217">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-219" value="trim_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-217">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-211" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-210">
          <mxGeometry y="60" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-212" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-211">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-213" value="length" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-211">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-214" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-210">
          <mxGeometry y="90" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-215" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-214">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-216" value="width" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-214">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-220" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-210">
          <mxGeometry y="120" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-221" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-220">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-222" value="height" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-220">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-223" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-210">
          <mxGeometry y="150" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-224" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-223">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-225" value="wheelbase" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-223">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-226" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-210">
          <mxGeometry y="180" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-227" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-226">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-228" value="front_tread" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-226">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-229" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-210">
          <mxGeometry y="210" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-230" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-229">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-231" value="rear_tread" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-229">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-232" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-210">
          <mxGeometry y="240" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-233" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-232">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-234" value="curb_weight" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-232">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-236" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-210">
          <mxGeometry y="270" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-237" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-236">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-238" value="front_tire" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-236">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-239" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-210">
          <mxGeometry y="300" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-240" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-239">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-241" value="rear_tire" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-239">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-235" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="WIyWlLk6GJQsqaUBKTNV-1" source="_SJC9zwR8TzXwhz_NO0y-217" target="_SJC9zwR8TzXwhz_NO0y-362">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-243" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="WIyWlLk6GJQsqaUBKTNV-1" source="_SJC9zwR8TzXwhz_NO0y-152" target="_SJC9zwR8TzXwhz_NO0y-362">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="650" y="350" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-244" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="WIyWlLk6GJQsqaUBKTNV-1" source="_SJC9zwR8TzXwhz_NO0y-42" target="_SJC9zwR8TzXwhz_NO0y-8">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-266" value="performance_specs" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;strokeColor=default;fontSize=16;rounded=1;swimlaneLine=1;align=center;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="810" y="690" width="250" height="122.00000000000045" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-267" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-266">
          <mxGeometry y="30" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-268" value="FK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-267">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-269" value="trim_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-267">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-270" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-266">
          <mxGeometry y="60" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-271" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-270">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-272" value="fuel_efficiency" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-270">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-288" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-266">
          <mxGeometry y="90" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-289" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-288">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-290" value="co2_emission" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-288">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-297" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="WIyWlLk6GJQsqaUBKTNV-1" source="_SJC9zwR8TzXwhz_NO0y-267" target="_SJC9zwR8TzXwhz_NO0y-362">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="660" y="190" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-298" value="chassis_specs" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;strokeColor=default;fontSize=16;rounded=1;swimlaneLine=1;align=center;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="810" y="860" width="250" height="272" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-299" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-298">
          <mxGeometry y="30" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-300" value="FK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-299">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-301" value="trim_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-299">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-302" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-298">
          <mxGeometry y="60" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-303" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-302">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-304" value="drivetrain" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-302">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-305" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-298">
          <mxGeometry y="90" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-306" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-305">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-307" value="transmission" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-305">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-308" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-298">
          <mxGeometry y="120" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-309" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-308">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-310" value="font_suspension" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-308">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-329" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-298">
          <mxGeometry y="150" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-330" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-329">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-331" value="rear_suspension" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-329">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-311" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-298">
          <mxGeometry y="180" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-312" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-311">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-313" value="font_breakes" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-311">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-314" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-298">
          <mxGeometry y="210" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-315" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-314">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-316" value="rear_breakes" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-314">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-317" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-298">
          <mxGeometry y="240" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-318" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-317">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-319" value="steering_type" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-317">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-332" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="WIyWlLk6GJQsqaUBKTNV-1" source="_SJC9zwR8TzXwhz_NO0y-299" target="_SJC9zwR8TzXwhz_NO0y-362">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-337" value="model_trims" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;strokeColor=default;fontSize=16;rounded=1;swimlaneLine=1;align=center;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="380" y="320" width="250" height="242" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-362" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-337">
          <mxGeometry y="30" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-363" value="PK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-362">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-364" value="trim_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-362">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-338" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-337">
          <mxGeometry y="60" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-339" value="FK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-338">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-340" value="model_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-338">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-341" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-337">
          <mxGeometry y="90" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-342" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-341">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-343" value="trim_name" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-341">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-347" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-337">
          <mxGeometry y="120" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-348" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-347">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-349" value="discontinued_flag" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-347">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-391" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-337">
          <mxGeometry y="150" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-392" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-391">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-393" value="release_year" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-391">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-350" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-337">
          <mxGeometry y="180" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-351" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-350">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-352" value="image_url" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-350">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-359" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-337">
          <mxGeometry y="210" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-360" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-359">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-361" value="create_at" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-359">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-38" value="model" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;strokeColor=default;fontSize=16;rounded=1;swimlaneLine=1;align=center;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="40" y="350" width="250" height="182" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-39" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-38">
          <mxGeometry y="30" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-40" value="PK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-39">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-41" value="model_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-39">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-42" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-38">
          <mxGeometry y="60" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-43" value="FK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-42">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-44" value="manufacturer_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-42">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-45" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-38">
          <mxGeometry y="90" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-46" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-45">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-47" value="model_name" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-45">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-51" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-38">
          <mxGeometry y="120" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-52" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-51">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-53" value="body_type" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-51">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-60" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-38">
          <mxGeometry y="150" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-61" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-60">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-62" value="create_at" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-60">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-366" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="WIyWlLk6GJQsqaUBKTNV-1" source="_SJC9zwR8TzXwhz_NO0y-39" target="_SJC9zwR8TzXwhz_NO0y-338">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-394" value="comment" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;strokeColor=default;fontSize=16;rounded=1;swimlaneLine=1;align=center;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="289" y="690" width="250" height="332" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-395" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-394">
          <mxGeometry y="30" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-396" value="PK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-395">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-397" value="comment_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-395">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-426" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-394">
          <mxGeometry y="60" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-427" value="FK" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;pointerEvents=1;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-426">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-428" value="board_seq" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-426">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-401" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-394">
          <mxGeometry y="90" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-402" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-401">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-403" value="parent_id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-401">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-420" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-394">
          <mxGeometry y="120" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-421" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-420">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-422" value="content" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-420">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-433" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-394">
          <mxGeometry y="150" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-434" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-433">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-435" value="like_count" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-433">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-404" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-394">
          <mxGeometry y="180" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-405" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-404">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-406" value="create_user" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-404">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-407" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-394">
          <mxGeometry y="210" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-408" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-407">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-409" value="create_at" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-407">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-410" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-394">
          <mxGeometry y="240" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-411" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-410">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-412" value="update_at" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-410">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-413" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-394">
          <mxGeometry y="270" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-414" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-413">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-415" value="delete_at" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-413">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-416" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-394">
          <mxGeometry y="300" width="250" height="30" as="geometry" />
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-417" value="" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-416">
          <mxGeometry width="56" height="30" as="geometry">
            <mxRectangle width="56" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-418" value="delete_flag" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;align=left;spacingLeft=6;overflow=hidden;strokeColor=inherit;fontSize=16;" vertex="1" parent="_SJC9zwR8TzXwhz_NO0y-416">
          <mxGeometry x="56" width="194" height="30" as="geometry">
            <mxRectangle width="194" height="30" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        <mxCell id="_SJC9zwR8TzXwhz_NO0y-429" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="WIyWlLk6GJQsqaUBKTNV-1" source="_SJC9zwR8TzXwhz_NO0y-426" target="_SJC9zwR8TzXwhz_NO0y-87">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>


