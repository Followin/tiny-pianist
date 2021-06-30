FROM node:current-alpine3.11 AS build-ui
WORKDIR /app

COPY ./TinyPianist.Ui/FrontEnd/package.json ./TinyPianist.Ui/FrontEnd/package-lock.json ./
RUN npm install

COPY ./TinyPianist.Ui/FrontEnd .
RUN mkdir -p dist && npx ng build --output-path=dist

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src

COPY ["TinyPianist.Ui/TinyPianist.Ui.csproj", "TinyPianist.Ui/"]
RUN dotnet restore "TinyPianist.Ui/TinyPianist.Ui.csproj"

COPY . .
WORKDIR "/src/TinyPianist.Ui"

COPY --from=build-ui /app/dist ./wwwroot

RUN dotnet build "TinyPianist.Ui.csproj" -c Release -o /app/build
RUN dotnet publish "TinyPianist.Ui.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0
EXPOSE 80
EXPOSE 443

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "TinyPianist.Ui.dll"]
